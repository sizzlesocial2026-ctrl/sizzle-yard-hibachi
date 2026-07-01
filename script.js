const config = window.SIZZLE_YARD_CONFIG || {};
const bookingForm = document.querySelector("#booking-form");
const quoteInputs = document.querySelectorAll(".js-quote-input");
const quoteTotal = document.querySelector("#quote-total");
const quoteDeposit = document.querySelector("#quote-deposit");
const quoteBalance = document.querySelector("#quote-balance");
const quoteNote = document.querySelector("#quote-note");
const estimatedTotalInput = document.querySelector("#estimated-total");
const estimatedBalanceInput = document.querySelector("#estimated-balance");
const guestCountInput = document.querySelector("#guest-count");

const pricing = {
  adultPrice: Number(config.adultPrice || 60),
  kidPrice: Number(config.kidPrice || 30),
  minimumGuests: Number(config.minimumGuests || 10),
  minimumTotal: Number(config.minimumTotal || 600),
  depositAmount: Number(config.depositAmount || 100)
};

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function readNumber(form, name) {
  const value = Number(form.elements[name]?.value || 0);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function calculateQuote(form) {
  const adults = readNumber(form, "adults");
  const kids = readNumber(form, "kids");
  const guests = adults + kids;
  const subtotal = adults * pricing.adultPrice + kids * pricing.kidPrice;
  const total = Math.max(subtotal, pricing.minimumTotal);
  const balance = Math.max(total - pricing.depositAmount, 0);
  const minimumApplied = subtotal < pricing.minimumTotal;

  return { adults, kids, guests, subtotal, total, balance, minimumApplied };
}

function updateQuote() {
  if (!bookingForm || !quoteTotal) return;

  const quote = calculateQuote(bookingForm);
  quoteTotal.textContent = money(quote.total);
  quoteDeposit.textContent = money(pricing.depositAmount);
  quoteBalance.textContent = money(quote.balance);
  estimatedTotalInput.value = String(quote.total);
  estimatedBalanceInput.value = String(quote.balance);
  guestCountInput.value = String(quote.guests);

  if (quote.guests === 0) {
    quoteNote.textContent = `${pricing.minimumGuests} guest minimum / ${money(pricing.minimumTotal)} minimum total. Final confirmation required before deposit.`;
  } else if (quote.guests < pricing.minimumGuests || quote.minimumApplied) {
    quoteNote.textContent = `${quote.guests} guest estimate uses the ${money(pricing.minimumTotal)} minimum total. Final confirmation required before deposit.`;
  } else {
    quoteNote.textContent = `${quote.guests} guests estimated. Final confirmation required before deposit.`;
  }
}

function loadGoogleTag() {
  if (!config.googleTagId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.googleTagId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", config.googleTagId);

  if (config.googleAdsConversionId && config.googleAdsConversionId !== config.googleTagId) {
    window.gtag("config", config.googleAdsConversionId);
  }
}

function trackEvent(name, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

function trackAdsConversion(label) {
  if (!config.googleAdsConversionId || !label || typeof window.gtag !== "function") return;

  window.gtag("event", "conversion", {
    send_to: `${config.googleAdsConversionId}/${label}`
  });
}

function smsHref() {
  const phone = config.phoneE164 || "+16263664111";
  const message = config.smsMessage || "";
  const separator = phone.includes("?") ? "&" : "?";
  return `sms:${phone}${message ? `${separator}body=${encodeURIComponent(message)}` : ""}`;
}

loadGoogleTag();

document.querySelectorAll(".js-phone-link").forEach((link) => {
  link.href = `tel:${config.phoneE164 || "+16263664111"}`;
  link.addEventListener("click", () => {
    trackEvent("phone_click");
    trackAdsConversion(config.googleAdsPhoneConversionLabel);
  });
});

document.querySelectorAll(".js-sms-link").forEach((link) => {
  link.href = smsHref();
  link.addEventListener("click", () => {
    trackEvent("sms_click");
    trackAdsConversion(config.googleAdsSmsConversionLabel);
  });
});

document.querySelectorAll(".js-deposit-link").forEach((link) => {
  if (config.depositLink) {
    link.href = config.depositLink;
    link.removeAttribute("aria-disabled");
  }
  link.addEventListener("click", () => {
    trackEvent("deposit_click");
  });
});

document.querySelectorAll('a[href="#book"], a[href="index.html#book"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("check_date_click");
  });
});

if (bookingForm) {
  updateQuote();

  quoteInputs.forEach((input) => {
    input.addEventListener("input", updateQuote);
  });

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(bookingForm).entries());
    const quote = calculateQuote(bookingForm);
    const lead = {
      ...data,
      guests: String(quote.guests),
      adultPrice: String(pricing.adultPrice),
      kidPrice: String(pricing.kidPrice),
      minimumTotal: String(pricing.minimumTotal),
      depositAmount: String(pricing.depositAmount),
      estimatedTotal: String(quote.total),
      estimatedBalance: String(quote.balance),
      minimumApplied: String(quote.minimumApplied),
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem("sizzleYardLastLead", JSON.stringify(lead));

    if (config.formEndpoint) {
      try {
        await fetch(config.formEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead)
        });
      } catch (error) {
        console.error("Lead submission failed", error);
      }
    }

    trackEvent("lead_form_submit");
    trackAdsConversion(config.googleAdsLeadConversionLabel);
    window.location.href = "thank-you.html";
  });
}

if (document.body.classList.contains("thank-you-page")) {
  trackEvent("lead_thank_you_view");
  trackAdsConversion(config.googleAdsLeadConversionLabel);
}

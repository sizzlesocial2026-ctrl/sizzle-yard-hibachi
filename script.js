const config = {
  phoneDisplay: "(626) 681-5258",
  phoneE164: "+16266815258",
  smsMessage: "Hi, I would like to check availability for a birthday hibachi party.",
  depositLink: "https://buy.stripe.com/bJeeVdbii7Vr4ym6cz7IY00",
  googleMapsLink: "https://maps.app.goo.gl/HuKRDXf7StnUpv5q8?g_st=ic",
  googleReviewLink: "https://www.google.com/search?q=Sizzle+Yard+Hibachi+%E2%80%93+Hibachi+at+Home+Los+Angeles&ludocid=3950289117609659613#lrd=0x6a564786b5a35abb:0x36d23f05df370cdd,3",
  adultPrice: 60,
  kidPrice: 30,
  minimumGuests: 10,
  minimumTotal: 600,
  depositAmount: 100,
  formEndpoint: "https://script.google.com/macros/s/AKfycbwbIBuKgH286c8RTI8ebXUv90wqgo2p81oszPZNvNB4NO94NXmOXqeo-lsPLR0ykSglZg/exec",
  googleTagId: "AW-18300535067",
  googleAdsConversionId: "AW-18300535067",
  googleAdsLeadConversionLabel: "-udBCPKQj8scEJuCsJZE",
  googleAdsPhoneConversionLabel: "ET_PCNLU-8scEJuCsJZE",
  googleAdsSmsConversionLabel: "zPsiCNXU-8scEJuCsJZE",
  ...(window.SIZZLE_YARD_CONFIG || {})
};
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
    quoteNote.textContent = `${pricing.minimumGuests} guest minimum / ${money(pricing.minimumTotal)} minimum total. Sales tax is not included. Final confirmation required before deposit.`;
  } else if (quote.guests < pricing.minimumGuests || quote.minimumApplied) {
    quoteNote.textContent = `${quote.guests} guest estimate uses the ${money(pricing.minimumTotal)} minimum total. Sales tax is not included. Final confirmation required before deposit.`;
  } else {
    quoteNote.textContent = `${quote.guests} guests estimated. Sales tax is not included. Final confirmation required before deposit.`;
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

  if (config.googleAdsConversionId && config.googleAdsPhoneConversionLabel && config.phoneDisplay) {
    window.gtag("config", `${config.googleAdsConversionId}/${config.googleAdsPhoneConversionLabel}`, {
      phone_conversion_number: config.phoneDisplay
    });
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
  const phone = config.phoneE164 || "+16266815258";
  const message = config.smsMessage || "";
  const separator = phone.includes("?") ? "&" : "?";
  return `sms:${phone}${message ? `${separator}body=${encodeURIComponent(message)}` : ""}`;
}

loadGoogleTag();

document.querySelectorAll(".js-phone-link").forEach((link) => {
  link.href = `tel:${config.phoneE164 || "+16266815258"}`;
  link.addEventListener("click", () => {
    trackEvent("phone_click");
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
  const submitButton = bookingForm.querySelector('button[type="submit"]');
  const submitButtonLabel = submitButton?.textContent || "Request Availability";
  const submitStatus = document.createElement("p");
  let isSubmitting = false;

  submitStatus.className = "form-submit-status";
  submitStatus.setAttribute("role", "status");
  submitStatus.setAttribute("aria-live", "polite");
  submitButton?.insertAdjacentElement("afterend", submitStatus);

  updateQuote();

  quoteInputs.forEach((input) => {
    input.addEventListener("input", updateQuote);
  });

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    isSubmitting = true;
    submitStatus.textContent = "Sending your request...";
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

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

    try {
      if (!config.formEndpoint) throw new Error("Missing form endpoint");

      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15000);

      try {
        await fetch(config.formEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(lead),
          signal: controller.signal
        });
      } finally {
        window.clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error("Lead submission failed", error);
      trackEvent("lead_form_error", {
        error_type: error?.name === "AbortError" ? "timeout" : "network"
      });
      submitStatus.textContent = "We could not send your request. Please try again or text us directly.";
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButtonLabel;
      }
      isSubmitting = false;
      return;
    }

    sessionStorage.setItem("sizzleYardLeadSubmitted", "true");
    trackEvent("lead_form_submit");
    window.location.href = "thank-you.html?lead=1";
  });
}

if (document.body.classList.contains("thank-you-page")) {
  trackEvent("lead_thank_you_view");
  const thankYouParams = new URLSearchParams(window.location.search);
  const shouldTrackLead = thankYouParams.get("lead") === "1" || sessionStorage.getItem("sizzleYardLeadSubmitted") === "true";

  if (shouldTrackLead) {
    sessionStorage.removeItem("sizzleYardLeadSubmitted");
    trackAdsConversion(config.googleAdsLeadConversionLabel);
    window.history.replaceState({}, document.title, "thank-you.html");
  }
}

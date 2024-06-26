// This is your test publishable API key.
const stripe = Stripe("pk_test_51PNQAUP2oKTRLYpMfvLEo25OCEdo4cSEzJOIEd1rwCr0xw1kvQjFyQgit03xplbGsnso5H5naFdL53cuq3uhaWmb00tgk6BSYq");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}
(async function() {

    const configs = {
      clientName: 'MinnPost',
      env: 'sandbox',
      product: ['auth'],
      // 1. Pass the token generated in step 2.
      token: document.getElementById('plaid_link_token').value,
  
      onSuccess: async function(public_token, metadata) {
        // 2a. Send the public_token to your app server.
        // The onSuccess function is called when the user has successfully
        // authenticated and selected an account to use.
        await fetch('/get_plaid_access_token/', {
          method: 'POST',
          body: JSON.stringify({ public_token: public_token, account_id: metadata.account_id }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
      },
      onExit: async function(err, metadata) {
        // 2b. Gracefully handle the invalid link token error. A link token
        // can become invalidated if it expires, has already been used
        // for a link session, or is associated with too many invalid logins.
        if (err != null && err.error_code === 'INVALID_LINK_TOKEN') {
          linkHandler.destroy();
          linkHandler = Plaid.create({
            ...configs,
            token: await fetchLinkToken(),
          });
        }
        if (err != null) {
          // Handle any other types of errors.
        }
        // metadata contains information about the institution that the
        // user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
      },
    };
  
    var linkHandler = Plaid.create(configs);
  
    document.getElementById('authorize-ach').onclick = function(event) {
        event.preventDefault();
        linkHandler.open();
    };
  })();
  
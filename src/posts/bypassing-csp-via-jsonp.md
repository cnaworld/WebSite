---
title: "Bypassing CSP via JSONP in Legacy Apps"
date: "2023-10-26"
tags: ["CSP", "JSONP", "WebAppSec", "Bypass"]
excerpt: "A deep dive into how legacy JSONP endpoints can inadvertently create bypasses for Content Security Policy (CSP) implementations."
---

## The Premise: CSP and Its Role

Content Security Policy (CSP) is a powerful security layer that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. By specifying a whitelist of trusted content sources, CSP instructs the browser to only execute or render resources from those sources.

```javascript
// Example CSP Header
// Content-Security-Policy: default-src 'self'; script-src 'self' trusted-scripts.com;
```

## Enter JSONP: A Legacy Approach

JSON with Padding (JSONP) is a method used to request data from a server in a different domain – a technique that predates Cross-Origin Resource Sharing (CORS). It works by injecting a `<script>` tag that loads data from a remote server. The server then wraps the JSON response in a function call.

```html
<!-- Client requests data via a script tag -->
<script src="https://legacy-api.example.com/data?callback=handleResponse"></script>
```

The server responds with:
```javascript
// Server response
// handleResponse({"name": "John Doe", "value": 42});
```

## The Vulnerability: JSONP Endpoints and CSP Bypasses

If a legacy application whitelists its own domain or a CDN for scripts (`script-src 'self' cdn.example.com`) but hosts a JSONP endpoint on that same domain/CDN, an attacker might be able to bypass CSP.

Consider a JSONP endpoint like `https://app.example.com/api/jsonp_user_data?callback=parseUserData`.

If an attacker can control (even partially) the `callback` parameter, they might be able to inject arbitrary JavaScript. While modern browsers and frameworks often sanitize this, older or misconfigured endpoints can be vulnerable.

### Exploitation Scenario

1.  The site `app.example.com` has CSP: `script-src 'self'`.
2.  The site also hosts a JSONP endpoint: `app.example.com/api/jsonp_data?callback=...`
3.  An attacker crafts a URL: `app.example.com/api/jsonp_data?callback=alert(document.domain)//`
4.  If the application reflects the callback parameter without proper sanitization into the script output, the `alert(document.domain)` executes within the context of `app.example.com`, bypassing the intended `script-src 'self'` restriction because the script is technically loaded from `'self'`.

```javascript
// Maliciously crafted response if callback is injectable
// alert(document.domain)//({"data": "sensitive"});
```

## Mitigation Strategies

*   **Phase out JSONP:** Migrate to CORS for cross-origin data requests.
*   **Strict Sanitization:** If JSONP must be used, ensure the callback parameter is strictly sanitized to allow only alphanumeric characters and underscores.
*   **Content Type:** Ensure the JSONP endpoint responds with `application/javascript` and not `text/html` to prevent HTML injection.
*   **CSP `script-src-elem`:** For more granular control, use `script-src-elem` and avoid whitelisting entire domains if only specific script paths are needed. Consider using nonces or hashes if possible.
*   **`require-trusted-types-for 'script'`:** A newer CSP directive that can help mitigate DOM XSS by forcing data passed to script injection sinks to be processed by Trusted Type policies.

## Conclusion

While CSP is a vital security measure, its effectiveness can be undermined by legacy patterns like insecure JSONP implementations. Security assessments should always scrutinize such endpoints, especially when they reside on domains trusted by the CSP.

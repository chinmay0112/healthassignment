// public/sw.js

// 1. Service Worker Installation
self.addEventListener("install", (event) => {
  console.log("SW: Service Worker Installed");
  self.skipWaiting(); // Force the waiting service worker to become the active one
});

// 2. Service Worker Activation
self.addEventListener("activate", (event) => {
  console.log("SW: Service Worker Activated");
  event.waitUntil(self.clients.claim());
});

// 3. Listen for "Notification" messages from our React App
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, body } = event.data.payload;

    // Wrap in event.waitUntil to ensure the SW doesn't sleep before the popup displays
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: "/vite.svg", // You can change this to a healthcare icon later
        badge: "/vite.svg",
        tag: "patient-alert", // Prevents multiple notifications from stacking
      })
    );
  }
});

// 4. Handle Notification Clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // Close the popup when clicked

  // This focuses the browser tab if it's open, or opens a new one
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Focus existing window if available
      for (const client of clientList) {
        if (client.url && "focus" in client) {
          return client.focus();
        }
      }
      // Open new window if none exists
      if (clients.openWindow) {
        return clients.openWindow("/dashboard");
      }
    })
  );
});

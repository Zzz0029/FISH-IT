// Device Authentication - Simple device fingerprinting
// Hanya allow akses dari device yang sudah di-authorize

const DEVICE_KEY = 'fishItDeviceAuth';
const ADMIN_DEVICE_ID = 'fishItAdminDevice';

/**
 * Generate device fingerprint sederhana
 * Menggunakan kombinasi screen size, timezone, dan language
 */
export function generateDeviceFingerprint(): string {
  const screen = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const platform = navigator.platform;
  
  // Combine untuk membuat unique identifier
  const fingerprint = `${screen}-${timezone}-${language}-${platform}`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return hash.toString();
}

/**
 * Check if current device is authorized for admin access
 */
export function isDeviceAuthorized(): boolean {
  const storedDeviceId = localStorage.getItem(ADMIN_DEVICE_ID);
  const currentDeviceId = generateDeviceFingerprint();
  
  // Jika belum ada device yang di-authorize, authorize device ini
  if (!storedDeviceId) {
    // First time access - authorize this device
    localStorage.setItem(ADMIN_DEVICE_ID, currentDeviceId);
    localStorage.setItem(DEVICE_KEY, 'true');
    return true;
  }
  
  // Check if current device matches stored device
  return storedDeviceId === currentDeviceId;
}

/**
 * Authorize current device for admin access
 */
export function authorizeDevice(): void {
  const deviceId = generateDeviceFingerprint();
  localStorage.setItem(ADMIN_DEVICE_ID, deviceId);
  localStorage.setItem(DEVICE_KEY, 'true');
}

/**
 * Check if admin access is allowed for this device
 */
export function canAccessAdmin(): boolean {
  return isDeviceAuthorized();
}


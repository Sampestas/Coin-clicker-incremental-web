export function isMobileDevice() {
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i;
    const isMobileUserAgent = mobileRegex.test(navigator.userAgent);
    
    return hasTouchSupport && isMobileUserAgent;
}
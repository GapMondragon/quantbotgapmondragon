import * as LiquidGlass from '@liquidglassjs/core';

// Expose directly to window for vanilla HTML usage
if (typeof window !== 'undefined') {
  window.LiquidGlass = LiquidGlass;
}

export default LiquidGlass;
export * from '@liquidglassjs/core';

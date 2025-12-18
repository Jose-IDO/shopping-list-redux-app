if (typeof URL !== 'undefined' && !URL.canParse) {
  URL.canParse = function(url: string, base?: string): boolean {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}


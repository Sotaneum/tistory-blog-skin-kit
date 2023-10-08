export default {
  base: "./",
  build: {
    assetsDir: "images",
    rollupOptions: {
      input: {
        app: './skin.html',
      },
      output: {
        assetFileNames: ({name}) => {
          if (/\.css$/.test(name ?? '')) {
            return 'style.css';
          }
          return `images/${name}`;
        },
      }
    }
  }
}


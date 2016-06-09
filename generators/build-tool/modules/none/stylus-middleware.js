app.use(stylus({
  src: path.join(__dirname, 'public'),
  use: [nib()],
  import: ['nib']
}));
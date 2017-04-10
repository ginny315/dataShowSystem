fis.hook('relative');
fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
})
fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css',
})
fis.match('*.{png,js,css,less,html}', {
  useHash: false,
  relative: true,
  release: '/$0'
})
fis.media('test')
  .match('*.{css, less}', {
    optimizer: fis.plugin('clean-css')
  })
  .match('*.{png,less,css}', {
    useHash: true
  })
  .match('*.{js, html}', {
    useHash: false
  })
  .match('*.js', {
    optimizer: fis.plugin('uglify-js'),
  })
  .match('config.js', {
    useHash: true
  })
  .match('host.js', {
      optimizer: ''
  })
  .match('**.htm', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('**.html', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('**.js', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('**.less', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('**.css', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('**.png', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('fonts/**', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('**.jpg', {
    relative: true,
    release: '../yw-dataShowSystem/dist/$0'
  })
  .match('**', {
    deploy: [
      fis.plugin('zip', {
        filename: 'yw-dataShowSystem.zip'
      }),
      fis.plugin('local-deliver', {
        to: '../'
      })
    ]
  })



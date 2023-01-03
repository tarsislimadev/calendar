
nTag.fromElement(document.body)
  .setStyle('margin', '0')
  .setStyle('padding', '0')
  .setStyle('font-size', '16px')
  .setStyle('font-family', 'sans-serif')
  .setStyle('background-color', '#eeeeee')

const title = new nText()

title.setStyle('padding', '.5rem 0')
title.setStyle('color', '#f0f0f0')
title.setStyle('text-align', 'center')
title.setStyle('background-color', '#000000')

const title_link = new nLink()

title_link.href('/')
title_link.setText('Calendar')
title_link.setStyle('font-size', '2.5rem')
title_link.setStyle('font-weight', 'bold')

title.append(title_link)

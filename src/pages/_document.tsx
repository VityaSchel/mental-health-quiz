import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <script type="text/javascript" dangerouslySetInnerHTML={{
          __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
        
        ym(${process.env.NEXT_PUBLIC_YANDEX_METRIC_ID ?? '0'}, 'init', {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
        });` }}>
        </script>
        <noscript><div dangerouslySetInnerHTML={{ __html: `<img src='https://mc.yandex.ru/watch/${process.env.NEXT_PUBLIC_YANDEX_METRIC_ID ?? '0'}' style='position:absolute; left:-9999px;' alt=''></img>` }}></div></noscript>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

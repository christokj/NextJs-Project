"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import "./Box3D.css";

gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

const textureLoader = new THREE.TextureLoader();

const Box = ({ position, images }: { position: [number, number, number]; images: string[] }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {

    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.scroll-container',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
        rotation: 360,
      });
    }
    return () => {

    };
  }, []);

  const textures = images.map(img => textureLoader.load(img));

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial key={index} attach={`material-${index}`} map={texture} />
      ))}
    </mesh>
  );
};

const Box3D = () => {

  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(scrollPosition)
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Detect scroll position
    };

    // Attach event listener for scroll
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const box1Images = [
    [
      'https://s3-alpha-sig.figma.com/img/584d/5e3c/0aca890e73a9ff26749c7389914bcc20?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GHW01prsDojapZvEdTGsM5mTE8NE9h6jKPrDrEzWOnufwUZhqHU--SmVhP~onzBfVUHqohCX1~Ub27uZOsrhe30nh857xSLYh-LI8hfwD94Q4gr0VPjo7jJXZvPJxXUYnLwhvBqIabaCAbU51-9Cf9ZQGyAr6RpbHEnYArKoQa7Cyg1x60xbMFexTe~T1YhfawMXyg76H-whTzE1GEi~xd7w32zEyp5XVoMjGpiYkbwoUXkofR0DmwEHiItyagtoP2ZQZC4qhdK9qkofkmJUXSOMwQPOcnEXBzc14bt8LPPiy~O39X1wnKVzYG9EGNtUc2QlMWnxVH790-VTzKJwyQ__',
      'https://s3-alpha-sig.figma.com/img/76b3/87b9/f9b2f6fc964189431a4d142f48aaa542?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KLR6SRVqMHt5V4lAYIo0cjLuefrR2p9cNo5mQ6giyeMugsl7D5MKErug20zxUIYoZqTBR5EINEpiwTkeD51-g0c5AhYPaFbpN6dW3EgXg-YhJrLcYADWYFV7u-ZS8l4OeBx4GxJNwnae5ke9Zxur5FwJoRdOlGVYX3gORJ62QCKKXSQqMqRWK59T8sCtXTsDqCv3WFSma-kylPNixlKbjRQjjmPO1a~vVnOTOBcnvGU8ICPLuyTqnW8Zilw~MpuhQ~~Op04V3ICqrei9aHXxb2fv4Ip2i9IrIUIpRiu0SRJUF5gp23v-lrMHCQvSGumsYWI3zt~tIoV0tb7uUVjzKA__',
      'https://s3-alpha-sig.figma.com/img/5f01/5796/afbbc028b4cf7096378cb4cd08084bf0?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ofUahETath5rXPgror0ee0WBDM6YGPEpoKmyBvCQ4MMsqZl7RC--G0wdR95i-e~Vz4krL7dcn3VdVJ-LnpW6CxP0hoe1Y2xIg8naAA~Za4bp6O2JCQ7id4vTPZh4AOdnOOQNQw3bekBJ7QOCYqX~8FwUR8-~mv0D2i9SbQQoki0eYuHdy30tVwJaHQwCuFiKcN~7r2D8bDubCcvJ50UTC7ZLjSJlsrM2wMoQRV~kQGlYAJ3fl95nY6WbkE2472UJieEsMcubao0zq69lZbeJ5RTIgCI59ICS85jPaa8mLvLNMkSUFV4TPAz2VijbhwazEa5cUmn5SPTEJoduhjGmoA__',
      'https://s3-alpha-sig.figma.com/img/4c13/633b/4daf37137e3ca5ab4f87e3dbf9bde9f7?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ByuEw4gsEKA6Z71OKzRWzXeKXfStJ7yirVsWAuXqFHNMGiqyT7gwRRwd4d4EfP-Eb~T~uUJ1~pPmXuskrDdReM8PY0vKGApA0TFSD7Yqnm0v3CZ9~BzDxqlMO5rNT5s5iSq2xTMzTvfA~wIjGorc2XalEdppanzc-ecJjc9hJTX30lvlYgcBDACS6C5SinPDMIJlwrjUX~vLGW6tBMP5cAhg-iu44j~8oTN3ifZUOR51R883YaHhje5h81FiIBg-KyhHvl4XBxJMHgDdmegL9cKaJG5oMOxQs0kRJBKZI03yCKaJ5Th5bhexKWd3sIgemPgnXaESd1t~u5dOQ0TDuQ__',
      'https://s3-alpha-sig.figma.com/img/824d/2e2b/9aac4ab4770410ad3fdc2c3840dd400b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RNrsPnNCFNmnh8IdOmy5f-~XItFOYhGGHYSTRjcgVRiTonU4wwOiN8PkGzsL~0C-JGeh~t0rRlhGn667tewhPiv5qcxAD7Xd2DhbcM45vONz2ml0bFf6teUHsJwRqIDzL7j0SvDsz~oKkKfnIy-JKfLc6r38r~UP5wamwjmZyPQNYCKPWXcOVelBSsajAqKE9RzaOO~qqPgw0GS634WlgbEIxV1LUBzwC9KELoV0G~vhxd7mZ~ogf~djwlpwZj74vAsXImhydyrnHlUYDhiSYhRZMXg0Rk4gmouv5lmAEAxnBwpHEfUEUcA9V8~OyoFgNq9puKee0H4IEOcFN5cMeA__',
      'https://s3-alpha-sig.figma.com/img/d9db/4756/36b01b56570e7b94d84b81d34f7bb0d6?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pQ-d5XZ9BH5GslVt0HBB1150YcT41ebJyQe54are0hOpKCmevMMkET-RTE3Tph5p8-afkuSKbbxkfhUO13m7cKiVoDS9k~tHE6IgTNsBls~k-cFSpoh3Wr~Jcfq9slp8TcMv~attscHA-BUgTBFBTJxWu5T0N0rMJxiOqprcYzs6nuFiroQaGGgVS0hyzubvUfh7NdTVhRNvzHOcMEbIovXWxsffFLrFFPi5QIjoqkFk1ZHV9xdbQs~faSxaGZWwMpYbHtM1M5tSnOI5SaIFyWuKCbPOR5gjuR-MJSNFh4tiBSA7NCXc6QFZAV52xXd03eqFpY5y7PXIOBBTxeIMfA__'
    ],
  ];
  const box2Images = [
    [
      'https://s3-alpha-sig.figma.com/img/8df3/8730/c27e1f3f2347b9c5280adea7bb088028?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=D1Bq09aafHnSvmHa7~m9O6lvoMzExIXvpWyEep~nPC9ST4ksbnxc4tg-CyYeN-LVZCL1MFUmBTW-3bgp~j8DSYVsYVzT6zFkVRu3oX-2Ms~9y1d7RzhEI-lcJ6elofAM0rPyVuiBOG~YjloB40ky-fkg0uSWey7g4MEfG1yGOH6dzmMTqEKICcmm2uHrOugAFdbqWgexEf0eqOkRtIX1FnzgnQpXX8sl1EIIIUIcr~UDJ1puiF3Nru9v6wODlMLi6ObaFfM7hoGLBRaBK9O2f1nVsNc7YX~95D~-aybf-IYwkhEN7Mc4VxJ-kOz29wZFODuN3ha6p7bsCaci~aW-YA__',
      'https://s3-alpha-sig.figma.com/img/07cd/721f/cadee62a122ed5493a4f9ef2b7723851?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Z13RQtsxeOA47bvrS~Rqs2KHQWZnhS8JbYOb1FtDe6Tmjrt9UY6byP7rz8u6fDw1kXhoB8labZdmNYz9YhBdWsbpbnqPwMO7wPhqJsXNhq8NDh9w-5kk51lJSs0ht320tAFFlfalOH6N6mramsXLNyIKAsckL7M8edwjsLOyouMabi7iRnWAx~NY~OLGFLdg1zHrJt8-tvULv0naY1IYTN9WK3~nHVSuBauB44odsosSGF4Rw2g~C-1KihDxJlOe~-TWwI5I4qAJ8DEkGNZLniMjNtHHi~jcLVWp6BxlWV6ijCF4BCbwZEoLANevzKUybcoV9TFndTrhnwItLZDBHA__',
      'https://s3-alpha-sig.figma.com/img/70f3/9292/86b8d36fa74e5c6565647e1ac41244af?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pERNtN~iMe~QNUN3SvIoeSmaN2SNCCtHb3GiskpAqY~TeKqPqwb6xZC4v4V4LvcjOukjsW4wyXGvaDUW~3pxhEaGk~fhPeM7bwDaDdPXDSyEBMMSQKU8TpqQFhYCXh59uFRalstILyMe1ZPLDwTrG8TQOJGZItYKQCegBWEjss9IDeJrSYKSB0AzQuWLWaaedj0soUi1sHDSYEA93XVLYdUcq7RncUVvrhAbq5eWc9n9gMpvp6BaIWX~k7EXF0drmt3AaVRLfRAg0vrOMY55Vq8NLXx4r~YlrNEESC5bgkWLP5oeFsuzMK1WFdeCn0aDSSNeiMXx3ZnxsEgat6-2kg__',
      'https://s3-alpha-sig.figma.com/img/76b3/87b9/f9b2f6fc964189431a4d142f48aaa542?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KLR6SRVqMHt5V4lAYIo0cjLuefrR2p9cNo5mQ6giyeMugsl7D5MKErug20zxUIYoZqTBR5EINEpiwTkeD51-g0c5AhYPaFbpN6dW3EgXg-YhJrLcYADWYFV7u-ZS8l4OeBx4GxJNwnae5ke9Zxur5FwJoRdOlGVYX3gORJ62QCKKXSQqMqRWK59T8sCtXTsDqCv3WFSma-kylPNixlKbjRQjjmPO1a~vVnOTOBcnvGU8ICPLuyTqnW8Zilw~MpuhQ~~Op04V3ICqrei9aHXxb2fv4Ip2i9IrIUIpRiu0SRJUF5gp23v-lrMHCQvSGumsYWI3zt~tIoV0tb7uUVjzKA__',
      'https://s3-alpha-sig.figma.com/img/2390/4e96/0fdc18dcb420242f7235b9961d5218d5?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JQRZb6jgd6Uq8x7FpikATPASc3qlIq5PoYW8Mb~X-J7WTYhHniarx0KG~m-qciNkEYnN8Tg6Jrkm1k3uZbta-aOcmqEBneUhyDCdRoJfJ2OCEPSITtQkXk6Zjym8O67DqZ5lZylcjwIeGcwxlLqUcrcgxv9ZlO0kSE224m3OJXRU--33Y3aUNp3i1TtbnrLyVX6Hty-jAfmKsRvyKOQW0e-YTosWqWwtFF-wzX1ceMOvUBEB9v~~P1FnKekLgf9MJh9TUAA6JwCCf3ukq1ek-XIaXsa3GlJnfFpdJY7D8s1cYPH2oISmatT3NPInvjNWykyqPPp6g9myoq4ZlBxlYQ__',
      'https://s3-alpha-sig.figma.com/img/8e8f/0598/f0692163cba347fc9ffce53cfdb5879d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=g0O5yYnAfiEb34Yuia6hmTan7J8hH6PJUzGMlh-KK~qkRfWxQ6beliiGSmO7b8tpEaU79nfj~Wafs93R0C-PVNVAXMHwDSYnJW0cjwfyqZAs-OoZYH4xRxCM2o7E6T7RCSMSoR1BUyjjo8mUpGxSGkKI6Tky1b1Pt3~8vo97j4QxmkmZa6xXx0ztn5uT32CX1jYtKayJWvt~WHgcrwNCm3xIsG05vdHnITGdv2TzNeSpc87SlJnTFHcBBCuWJjCuE9we-DQZPraMz825Z8SjpnxwXPoZbbEUH4K7Z61sNGLToRnFbGWrxLqXNBFUQBLBY5he~Gm2x19cez04~hwL8g__'
    ],
  ];
  const box3Images = [
    [
      'https://s3-alpha-sig.figma.com/img/c868/7cc8/c3ad239f910f65b25f01df837fb0546f?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=T3TnpN-sIGA4n-Q89SoK1~31~dYx5fSjOBFDhWLJ7rWKSMeXiGzGzn0WcSdnB8m8brD6rJTq~ux0vreg7SyylvVrNNthjfSI~7KUoqrU6s1ZGtDvHAZPV8rGaqrNWoziyhTMhOISTJmj86n6IB2QbU6OtG1EzWlyR7h05EsRx14u4kjf~mPNgqaDdl8xSahry703C1oEhxY~v-6sGQuIVCJuyB7JLrS0kKuSbANt6a~~145cRLwBYLHtBoKMGuwIog2E1OJZGDgOS4mG3I6x3p3ayfssv5Ug~EQ5Ol8EkoyN-jZ15nFTvH2whB0XlCBe2wKImwsbWRGwA7wbKh5PaA__',
      'https://s3-alpha-sig.figma.com/img/cba2/92ba/26cdf97c20b59c62b14e00afff7520cd?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pIPFCiacLaPlBtp0gfj~nDhi-4KGSG4xTV0Lmv9FLLipmtAGt~Y1~9YjeEGKci-xZOSI3iJ~8faTUFu8hMM0miGwek0Mi-z7x9RgUdRoR4e~pGVCIziECAxngLlJPdZf6XZ1AJqvhLF52oNrnpyCE3yj0Zzlvp~1k1POVfyq2QHKbBWG1Pop9MgXYEvaCjB9bcV4GJiBI39o1LFPhutV2JpPmxecNWXWHLNhlv3mej7TQqP45wjbw5s75iol9MZ8o5AxOjN0vjFaDPgVMIVW8zIBchm-ST5agoBSgqrPXQFEEAqWiRGLKnD2emi~qC2vxl-cqz6KjTZB4yzdfWfacQ__',
      'https://s3-alpha-sig.figma.com/img/a394/9999/3b6435b7d0e099637609bca289f50c8d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t60HEx2nZKFhaCrKwJdQXwWsYTXkg-1EICgzijSZQKVEQy5qqlWpKDpJDMS7D7hzWQuj3jxNmh4qUCRsgW0OWA1gfFo91sjvjgYxiDYFnX9fmVIF1K5uqM0olqi3n7YDuzGMbKZyUngWfevdwv00TEBEj3ARTwf~G3ETlHRjMfJkQX1ijri-b3z5YyiHAycyKX~PAfLBxyurWSZxheFsNuEfOIqPX~SnjXUuvHMfvtrMfNopZkWsM26ZV6acTMbvPG~-3-6kA5ZNl6R7GAHWyrAKJ7ojEaQO1mju9z3LGSBqYpY8GMecJNdr9~Y-vtQo8tUB4NevtejfLgBUyLGbdw__',
      'https://s3-alpha-sig.figma.com/img/3ea2/783d/4a0fcece448e07bff9834f64b90d78d1?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=cPEKmFXXekbJh6PAO~1TB0~rxhokhD~lebLkwtBheVyMI-p~zAk4JCBEKcPZGewP8OlBK~z~1lzH-228gqKoHHO2duZJCdqFWRlno7qaYw18HutcHcuU7MkFoQRIIhEePhjaQ5Di-~QK2wR~v2ayOVTTs34EJ1IukkzifMqkXsEgA48iOYCi8i3oXkjoGjrwAWnqNtWVujOK0JA6e0fJHZbVxT8f-kGD7GS4nt2Sx2~I5pDvSE52IBppGEjdqvIpMLWkLm264GZUJAal8Z2rrXNauH0sSLdXTXS4UaniX~XMp1MDBlCzb5UR3NAUoLRqvu7nYBYqqbtIyagIJNLH0w__',
      'https://s3-alpha-sig.figma.com/img/be08/16c6/5b6022cc9f97967eb3dfdea12a84ac3c?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Wd8MmiPtrhS1PGR5Qkln8EEWb4t4UpwVGjQ3m79AgGFPpQzopuksUUzmHWCYdTadZhTF3sU9yxq1vGx8jchp1aBEwylniY6P7cL0ftHzoaH5eZfP~JlRUUHfk6VgV2CQjA9KebKLpZld~TcL~UR1Egyx~qUi8cQchpe3vFgTQUnl48YmHXYuXFlu1Flb1DoIMS9Ru2p2PFyn5UK1V-kUz80wYqXy94-0LZMKKJ9VcwdzqZMtKdwCfh8pLsUbDk-HiOFcCEwa9ag8yIcXLojzYXXLBz7QWTx3f39X0wQmisadTA1iAkCFjroai-jMdJAugG77jPgTIe4RDgPQi80UBw__',
      'https://s3-alpha-sig.figma.com/img/0368/e934/4428ac0190d3fb7196d5653a23f1998e?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=hW36fr2oF0sSQqaaFvGuZcp1fEyW7vsv2hY2hNNvdLvWAALEx-YZ6Akchv2qglP858IE~pvRBHZZjn6gVQepZpzGj1VPITS85FBkOTFykdzAC5ipTjze343zmCZb08l1Y9omfeyEgtcGeFej2i-xjMCplzAZ2Amu1GXQF472icgcOM92nvW~QRkEOC4FxrPaQDMpEMyPkoaAyEBMLJ6DqXhCOVHN9sLgxpde4S4tGVO3Eq-DSJbqPdolJCYISftCUft8W4dXbqtzdB-DpHULA3fjoSbZuoKLVd2XFyIGtpYZOdRH2VdC3FD~YWLKnbbcncpXUlA0pr7CEPxZ~ChWQw__'
    ],
  ];
  const box4Images = [
    [
      'https://s3-alpha-sig.figma.com/img/bc65/5389/da58b13911e2ef37c931c67e4f8c0a58?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Rli~tnDJHeayUmQIsPxMvjpLD~ObvNw6ZoXMTiIoCvIlH4zBA8p08hNo3I~xImasXvyVK07SeSc8zA7APg0r1cRGie46xdluTL6Szh545Fo~qqcAOtE2dkkxYYo9Oi8wkeG22HO-O7GGfBTlRNCzKIahU7RTPALmZFt6H0R5KQgpvr8wv9rX6vq-rKgV4RFCGunyXhaT4hCfvJWkkY3UgHrsS6v4peelPp8Juh8qsh7EuaW~BLxyyACpcTmoJ6kTUWP7DGDFrghv4EHf2Y1R0g92SXhpqBn9EumncE9KpI9q0Z8SYzNg-YYR9LOOMB0frShoL5o7KrIjZQzqlulFog__',
      'https://s3-alpha-sig.figma.com/img/b651/52b2/56776383bc519864e7af50c3f48f79ba?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V9cEaRka8I0O9A45FO2VfT5PLm4fy5PxGspRJMhxxb21J92nSV86oZUeWXZqOp0YVbPzk8iX6-FtnsMOFStlNEPJ2-UNaIqfNbbT-XMAVfSFZz2d9U6J4R5ZF4dgbA5oX3uHET4cog4s5EjFY0~DURlF80EmyquF7kf~DGgZ7XOiaYiLuYFFhnu7oiLLowCsScE~29GO8hhXUvWEt47desq1fzKoEV~MJVuoyBVIrMJ-XIS3I~yyhpa8PQJ-JlRGJBU0wDtIRyYMNBSkDINBEBRUCEinn6jyAmCdA~y3eYcbyy6BEQRGvYyNK8c2uvuIshBK0rj9mJ5ArVGR6AGBNA__',
      'https://s3-alpha-sig.figma.com/img/f658/55a6/1115a6b1c6a842b6c330f1ac96a321ec?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=sY-b8Fq0pqaLe6tA1piQJUbYxehTEWAU141TD3PS2KtXx8co8gS4ZkdLbFqnNn0bssQ2d83eNVqEUmnwNMepE4mNSnHE6erYDGF8xyHoT3Z53fB-GWFaDwc-BgjJGv1c1bId~wn3Eyg979oesfCj0BcWIt3Dswh1QDi50tXuzG9KjLPbEeQus1nZjA1INgHwojvDPwD5IpQ494irFtZZcU7CTx6iI6qdQvstTa2DGLKlvjOtG2bYPDjHHm7OjDEWkYyp2CNyDlcIU33oz4onUv23R3oBkW20KA1eIy4LvqKg8MKo5zUiMXMMINI5iDUQinKk-pqAS3y-xSJIN0-lSg__',
      'https://s3-alpha-sig.figma.com/img/80cd/dd3c/f68f1e7f3c1996d90263a035d024dd0a?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PfNAeMZ6o8lmHtVay6cdTJcI5A2dca77dXAJtU653mrjj6PJrk0X1zorKB4-RH9KQePxTa5b8FNywqghsfMUBJLrDvyUVxELGVP0gOI6LJj-cqXrjKoqf3NJ0Bu-OPt~1Is56x2wsaubHVzouFPAufLT05lmz64CTxPavOVVmQrWkq3XSVjvfCtGCkPXJnjPxGQFqiwNshhLJDGHfsajyo20neZ4WTbgHIQngNT60h2dILFGOMDqKdLveXC6wU9BSBIu6slNEj4JDrY8BddNsizT5fnpDHd-7JFj5382JA1vIb-HACoq~4vcNyghLHJqggzGSNMhqvuOYuLZWeeQng__',
      'https://s3-alpha-sig.figma.com/img/3d67/65b6/4a733dd29eacb6a27b703b938df0dd6a?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ad3VMv5-23LHZS1-O6hF2NLEbv9DXCZA0ljwGRNPgH36thw4MaTdp2EsR9VkcbULMqHpWsbXQIhVCGFrDhK2D8YstWXbiPwSQBNi9uc9JL-hYUF8xjErGxccaJxF4ly3pjPdm-UvxAxj7RjdMr4SHLII52bbv~rHOu8WgoRlSZigVlG0F8ceySPA~2ORbclgN1qaEDZDsznACDeanUFisQC3AUAZGwop5~xlODTr4myNLBwqAUed71aJ7D7X2lXW8gWm6N~O0oJjHnxSg3H4jWBEqERK0FuJjvDFZ4g7t6CBiW6eyC-K2jNgz-v2qaq17-7Un3yIHUGhBsjascKsZQ__',
      'https://s3-alpha-sig.figma.com/img/0468/fb91/6a85dde19303bca88f64faef149e3a92?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QJmaM--knKu3ljkLj0dLkdyv0M8tWQn0PTRcD0yb89yPEK4XbEBGqXZEkvYb94Drc8bXLj8-yQXlju4hCBiaRhBA0WV2kRNznRrD-u4Eaf9A5S1dXW6KgvfqQq2nCMcbS5-IbrqeG3q8KRmwd6XtxOkFm2hGGEOj~m2K268vzu~uUQdaQlI8RW4yuXqXHWc4VLdfRxgaugpc3ZuKMUEpOpMtRuwZzOF~kgyClWrI61PkMjQ9ZHabZvEWnRFAgTinu5VONJkL-ejHut0-Uh6CdZTNNhTJltYhB4x2aUt-TfkXMKo~2wo7FHqV047nY0-hQe1gsXHb2loBKeHVpDjrMg__'
    ],
  ];
  const box5Images = [
    [
      'https://s3-alpha-sig.figma.com/img/76b3/87b9/f9b2f6fc964189431a4d142f48aaa542?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KLR6SRVqMHt5V4lAYIo0cjLuefrR2p9cNo5mQ6giyeMugsl7D5MKErug20zxUIYoZqTBR5EINEpiwTkeD51-g0c5AhYPaFbpN6dW3EgXg-YhJrLcYADWYFV7u-ZS8l4OeBx4GxJNwnae5ke9Zxur5FwJoRdOlGVYX3gORJ62QCKKXSQqMqRWK59T8sCtXTsDqCv3WFSma-kylPNixlKbjRQjjmPO1a~vVnOTOBcnvGU8ICPLuyTqnW8Zilw~MpuhQ~~Op04V3ICqrei9aHXxb2fv4Ip2i9IrIUIpRiu0SRJUF5gp23v-lrMHCQvSGumsYWI3zt~tIoV0tb7uUVjzKA__',
      'https://s3-alpha-sig.figma.com/img/70f3/9292/86b8d36fa74e5c6565647e1ac41244af?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pERNtN~iMe~QNUN3SvIoeSmaN2SNCCtHb3GiskpAqY~TeKqPqwb6xZC4v4V4LvcjOukjsW4wyXGvaDUW~3pxhEaGk~fhPeM7bwDaDdPXDSyEBMMSQKU8TpqQFhYCXh59uFRalstILyMe1ZPLDwTrG8TQOJGZItYKQCegBWEjss9IDeJrSYKSB0AzQuWLWaaedj0soUi1sHDSYEA93XVLYdUcq7RncUVvrhAbq5eWc9n9gMpvp6BaIWX~k7EXF0drmt3AaVRLfRAg0vrOMY55Vq8NLXx4r~YlrNEESC5bgkWLP5oeFsuzMK1WFdeCn0aDSSNeiMXx3ZnxsEgat6-2kg__',
      'https://s3-alpha-sig.figma.com/img/2390/4e96/0fdc18dcb420242f7235b9961d5218d5?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JQRZb6jgd6Uq8x7FpikATPASc3qlIq5PoYW8Mb~X-J7WTYhHniarx0KG~m-qciNkEYnN8Tg6Jrkm1k3uZbta-aOcmqEBneUhyDCdRoJfJ2OCEPSITtQkXk6Zjym8O67DqZ5lZylcjwIeGcwxlLqUcrcgxv9ZlO0kSE224m3OJXRU--33Y3aUNp3i1TtbnrLyVX6Hty-jAfmKsRvyKOQW0e-YTosWqWwtFF-wzX1ceMOvUBEB9v~~P1FnKekLgf9MJh9TUAA6JwCCf3ukq1ek-XIaXsa3GlJnfFpdJY7D8s1cYPH2oISmatT3NPInvjNWykyqPPp6g9myoq4ZlBxlYQ__',
      'https://s3-alpha-sig.figma.com/img/b651/52b2/56776383bc519864e7af50c3f48f79ba?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=V9cEaRka8I0O9A45FO2VfT5PLm4fy5PxGspRJMhxxb21J92nSV86oZUeWXZqOp0YVbPzk8iX6-FtnsMOFStlNEPJ2-UNaIqfNbbT-XMAVfSFZz2d9U6J4R5ZF4dgbA5oX3uHET4cog4s5EjFY0~DURlF80EmyquF7kf~DGgZ7XOiaYiLuYFFhnu7oiLLowCsScE~29GO8hhXUvWEt47desq1fzKoEV~MJVuoyBVIrMJ-XIS3I~yyhpa8PQJ-JlRGJBU0wDtIRyYMNBSkDINBEBRUCEinn6jyAmCdA~y3eYcbyy6BEQRGvYyNK8c2uvuIshBK0rj9mJ5ArVGR6AGBNA__',
      'https://s3-alpha-sig.figma.com/img/56c3/0a8a/268e90d238dbaf0ca1587871eb92f065?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Sz-kbsDm6g31V7YdqLlwD92BCMrh~~ap-L9U3jIR3yp2nEM1lXSMqB3T-WCa~OW-cn5nOl8h1LJPAxTW-nEkjlnL4ljEUq0jTJvry96zdMnV6S8-BmfE3a7bRSUVP5lkU8KXI2Vkh~nIcKJkoydUqF9cfQyJLf8B0tr7FlBQrPGovOKIFZahoT0wLS00D8c-6N4lssBzJCkYFkZ9QjoZGKPWAsIFWvNc0aZUdBFNTAnNqGca-8-1CoOsgWCfb-~WhlCgrNdjyvNWT-JlkDgEpqvDslEIMJjPyWGyTxPV70W3T0T93jsFs81~Rhq8~39LsRK6l-17Z8iIhA72mvQ9vQ__',
      'https://s3-alpha-sig.figma.com/img/9a72/b1d7/77052b553d09e65a49db3a0bd68388c2?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=eGL89TiV8P6SF-AP0EykYdmjiXYTlH3pqAa-8KEykQ0waq3jjI78kUnev28kGrAUg19h-hVp6luCCZG9~0HkXO1G7ckjbPuhGN-Aej42IItuNBsB4pqUMcXNo1-iqjRFFoe9X1iSDmXACyeLJqnf0b2BdiuJvWamRayrtnA0v2V5VqkX-ZlddR7Qtda-9l2N7PqNQw91uwdLIS6QPE-LipMFDS3QRs3pYYgNemEKCg9l9ElwMae~Or7IhE14~pqyBTSuNDcyrg9-kW4bHPGxiX8taUrH8xRNBwDdHMBlARePsxjoHL4eFI31f8H25H7x6U4OW-S3tTRtWaYhKfJG-A__'
    ],
  ];
  const box6Images = [
    [
      'https://s3-alpha-sig.figma.com/img/5f44/c4c4/46caca3075f28465d8c2d1cf12e3a533?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=swb3YAqcJDaMB4-lpuPTT2mzMZfNz4v7-PjssSfqepvcciKBEqyo-LHghoZQLaJRa8Lq0eETS~k7runzo9yMXAbrovXMRkq27FfkK7LwgWFamTJPa0BnqeH7-Z3Rk00fgIpdWmB~bmAJVnImC7-B-IPnEZ-nsbrFIMH2rw2sHZ8fncTzkXMYw2m9oWOCK9VomcWX1UOkrYu0lx4kVYOojvQBFhpF2o3vQxFLRVNXHCXPtWBEwa804s9ZrCb3S09lo-9wfWOOT4Zg0RpnCMtAzcbEAAgSyB-8CwxNfTwonbDJr49mDpoIjLWBhgADq5oS15oOo2eojI8ufzpZ0SVpdA__',
      'https://s3-alpha-sig.figma.com/img/80cd/dd3c/f68f1e7f3c1996d90263a035d024dd0a?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PfNAeMZ6o8lmHtVay6cdTJcI5A2dca77dXAJtU653mrjj6PJrk0X1zorKB4-RH9KQePxTa5b8FNywqghsfMUBJLrDvyUVxELGVP0gOI6LJj-cqXrjKoqf3NJ0Bu-OPt~1Is56x2wsaubHVzouFPAufLT05lmz64CTxPavOVVmQrWkq3XSVjvfCtGCkPXJnjPxGQFqiwNshhLJDGHfsajyo20neZ4WTbgHIQngNT60h2dILFGOMDqKdLveXC6wU9BSBIu6slNEj4JDrY8BddNsizT5fnpDHd-7JFj5382JA1vIb-HACoq~4vcNyghLHJqggzGSNMhqvuOYuLZWeeQng__',
      'https://s3-alpha-sig.figma.com/img/a394/9999/3b6435b7d0e099637609bca289f50c8d?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=t60HEx2nZKFhaCrKwJdQXwWsYTXkg-1EICgzijSZQKVEQy5qqlWpKDpJDMS7D7hzWQuj3jxNmh4qUCRsgW0OWA1gfFo91sjvjgYxiDYFnX9fmVIF1K5uqM0olqi3n7YDuzGMbKZyUngWfevdwv00TEBEj3ARTwf~G3ETlHRjMfJkQX1ijri-b3z5YyiHAycyKX~PAfLBxyurWSZxheFsNuEfOIqPX~SnjXUuvHMfvtrMfNopZkWsM26ZV6acTMbvPG~-3-6kA5ZNl6R7GAHWyrAKJ7ojEaQO1mju9z3LGSBqYpY8GMecJNdr9~Y-vtQo8tUB4NevtejfLgBUyLGbdw__',
      'https://s3-alpha-sig.figma.com/img/824d/2e2b/9aac4ab4770410ad3fdc2c3840dd400b?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=RNrsPnNCFNmnh8IdOmy5f-~XItFOYhGGHYSTRjcgVRiTonU4wwOiN8PkGzsL~0C-JGeh~t0rRlhGn667tewhPiv5qcxAD7Xd2DhbcM45vONz2ml0bFf6teUHsJwRqIDzL7j0SvDsz~oKkKfnIy-JKfLc6r38r~UP5wamwjmZyPQNYCKPWXcOVelBSsajAqKE9RzaOO~qqPgw0GS634WlgbEIxV1LUBzwC9KELoV0G~vhxd7mZ~ogf~djwlpwZj74vAsXImhydyrnHlUYDhiSYhRZMXg0Rk4gmouv5lmAEAxnBwpHEfUEUcA9V8~OyoFgNq9puKee0H4IEOcFN5cMeA__',
      'https://s3-alpha-sig.figma.com/img/3717/2890/902c545d5569b21f790cfbe9e147ad02?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QRZEqyGUEpVyBF2Vs9wyx3zLZVLg7VNq30xbWM1xZzEWX38PO17Zzs9jX~tJFMuYC8sctKwb07OOpexjCnU89FBDhLfnbK1AUv09u4v3F2KIrGdpRfm9Jw1hEcojNpa0WQPB0BP~MVBIAYQ0pUNnG~dw0jqOggnR0ZYZbcpT~qrmpBowMRvgzPDSUaeKROvEx05jChIeV~H6yRCu9ULk6OGRgBvx~UxMAhsPgWPF2a0lA-tLQykICy~ueki1w09elO7rXgKoGuYtoUn-WscUe7UsFQJe0aCohiajovf6cij2wxCT6ihInIwL2y7sU4Z6~jX-2-QEOvmvLLhkASOeuw__',
      'https://s3-alpha-sig.figma.com/img/3717/2890/902c545d5569b21f790cfbe9e147ad02?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=QRZEqyGUEpVyBF2Vs9wyx3zLZVLg7VNq30xbWM1xZzEWX38PO17Zzs9jX~tJFMuYC8sctKwb07OOpexjCnU89FBDhLfnbK1AUv09u4v3F2KIrGdpRfm9Jw1hEcojNpa0WQPB0BP~MVBIAYQ0pUNnG~dw0jqOggnR0ZYZbcpT~qrmpBowMRvgzPDSUaeKROvEx05jChIeV~H6yRCu9ULk6OGRgBvx~UxMAhsPgWPF2a0lA-tLQykICy~ueki1w09elO7rXgKoGuYtoUn-WscUe7UsFQJe0aCohiajovf6cij2wxCT6ihInIwL2y7sU4Z6~jX-2-QEOvmvLLhkASOeuw__'
    ],
  ];

  return (
    <>
      <div className='w-full h-screen static'>
        <div className={`w-full ${scrollPosition ? "invisible" : ""}`} >
          <h2>Scroll Position: {scrollPosition}</h2>
          <div className="flex justify-center items-center h-96 ">
            <div className="w-12 h-34">
              <div className="w-12 h-12 ml-6 mb-2 flex items-center justify-center bg-peach rotate-45"></div>
              <div className="w-12 h-12 flex items-center justify-center bg-peach "></div>
            </div>
            <div className="w-12 h-34 ml-8 ">
              <div className="w-12 h-12 mb-8 flex items-center justify-center bg-peach "></div>
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-peach "></div>
            </div>
            <div className="ml-8">
              <div className="w-12 h-12 -ml-6 mb-2 flex items-center justify-center bg-peach rotate-45"></div>
              <div className="w-12 h-12 flex items-center justify-center bg-peach "></div>
            </div>
          </div>
        </div>
        <div className={`justify-center items-center w-1/2 mx-auto text-center -mt-32 ${scrollPosition ? "blur-sm" : ""}  `}>
          <h1 className="text-6xl leading-none font-normal text-white">The first media company crafted for the digital first generation</h1>
        </div>
        <div className={`no-scrollbar fixed scroll-container top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-screen ${scrollPosition ? "visible" : "invisible"}`} >
          <Canvas camera={{ position: [0, 0, 10] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {box1Images.map((images, index) => (
              <Box key={index} images={images} position={[-2, 0, 0]} />
            ))}
            {box2Images.map((images, index) => (
              <Box key={index} images={images} position={[-1, 2, 0]} />
            ))}
            {box3Images.map((images, index) => (
              <Box key={index} images={images} position={[0, 3, 0]} />
            ))}
            {box4Images.map((images, index) => (
              <Box key={index} images={images} position={[0, 0, 0]} />
            ))}
            {box5Images.map((images, index) => (
              <Box key={index} images={images} position={[1, 2, 0]} />
            ))}
            {box6Images.map((images, index) => (
              <Box key={index} images={images} position={[2, 0, 0]} />
            ))}
          </Canvas>
        </div>
      </div>
      <section className='w-full h-screen flex items-center justify-center'>
        <div className={` w-1/3 mx-auto text-center -mt-32 ${scrollPosition ? "blur-sm" : ""}  `}>
          <h2 className="text-2xl font-bold leading-none m-2 text-white">Where innovation meets precision.</h2>
          <h3 className="text-lg leading-none font-normal text-white">Symphonia unites visionary thinkers, creative architects, and analytical experts, collaborating seamlessly to transform challenges into oppurtunities. Together, we deliver tailored solutions that drive impact and inspire growth.</h3>
        </div>
      </section>
    </>
  );
};

export default Box3D;

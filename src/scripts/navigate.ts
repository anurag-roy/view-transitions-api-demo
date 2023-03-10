let scrollYPosition = 0;

const getIdFromDetailPage = () => {
  const main = document.querySelector('main');
  return main ? main.id : '';
};

navigation.addEventListener('navigate', (navigateEvent: any) => {
  const { pathname } = new URL(navigateEvent.destination.url);

  const isBack = pathname === '/';
  if (!isBack) {
    scrollYPosition = window.scrollY;
  }
  const pokemonId = isBack ? getIdFromDetailPage() : pathname.replace('/', '');

  navigateEvent.intercept({
    async handler() {
      const html = await getHTMLFragment(pathname);

      // If the browser doesn't support this API, update the DOM as usual
      if (!document.startViewTransition) {
        updateTheDOMSomehow(html);
        return;
      }

      let pokemonCard;

      if (!isBack) {
        pokemonCard = document.getElementById(pokemonId);
        if (pokemonCard) {
          pokemonCard.style.viewTransitionName = 'full-size';
          pokemonCard.querySelector('img')!.style.viewTransitionName =
            'full-size-image';
        }
      }

      // Otherwise, update the DOM within a transition
      const transition = document.startViewTransition(() => {
        updateTheDOMSomehow(html);
        if (isBack) {
          window.scrollTo(0, scrollYPosition);
          pokemonCard = document.getElementById(pokemonId);
          if (pokemonCard) {
            pokemonCard.style.viewTransitionName = 'full-size';
            pokemonCard.querySelector('img')!.style.viewTransitionName =
              'full-size-image';
          }
        }
      });

      transition.finished.finally(() => {
        if (pokemonCard) {
          pokemonCard.style.viewTransitionName = '';
          pokemonCard.querySelector('img')!.style.viewTransitionName = '';
        }
      });
    },
  });
});

async function getHTMLFragment(pathname: string) {
  const response = await fetch(pathname);
  return await response.text();
}

function updateTheDOMSomehow(html: string) {
  document.getElementById('content')!.innerHTML = html;
}

import NProgress from 'nprogress';
import { router } from '@inertiajs/react';

let timeout = null

export function progressbar(){
    return {router.on('progress', (event) => {
  if (NProgress.isStarted() && event.detail.progress.percentage) {
    NProgress.set((event.detail.progress.percentage / 100) * 0.9)
  }
      }); 
    route.on('start', 
        (event) => {
              timeout = setTimeout(() => NProgress.start(), 250)
	});
   router.on('finish', (event) => {
        clearTimeout(timeout)
		if (!NProgress.isStarted()) {
    		return
		} else if (event.detail.visit.completed) {
          NProgress.done()
        } else if (event.detail.visit.interrupted) {
          NProgress.set(0)
        } else if (event.detail.visit.Batalkanled) {
          NProgress.done()
          NProgress.remove()
        }
      });
};
}


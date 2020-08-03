import { testSite } from './utils'
import { setup as setupYouglish } from './youglish'
import { setup as setupNytimes } from './nytimes'
import { setup as setupTheatlantic } from './theatlantic'
import { setup as setupVk } from './vk'
import { setup as setupSpotify } from './spotify'
import { setup as setupArchive } from './archive'
import { setup as setupWekanTv } from './wekan'
import { setup as setupYoutube } from './youtube'
import { setup as setupFeedly } from './feedly'
import { setup as setupLocal } from './local'
import { setup as setupGooglePodcasts } from './google-podcasts'
import { setup as setupBilibili } from './bilibili'

if (testSite('nytimes.com')) {
  setupNytimes()
} else if (testSite('theatlantic.com')) {
  setupTheatlantic()
} else if (testSite('vk.com/doc')) {
  setupVk()
} else if (testSite('spotify.com')) {
  setupSpotify()
} else if (testSite('archive.org')) {
  setupArchive()
} else if (testSite('wekan.tv')) {
  setupWekanTv()
} else if (testSite('youtube.com/watch')) {
  setupYoutube()
} else if (testSite('youglish.com')) {
  setupYouglish()
} else if (testSite('feedly.com')) {
  setupFeedly()
} else if (testSite('JianguoYun')) {
  setupLocal()
} else if (testSite('podcasts.google.com')) {
  setupGooglePodcasts()
} else if (testSite('bilibili')) {
  setupBilibili()
}

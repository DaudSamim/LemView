const splitURL = window.location.href.split("#");

export const BASE_GMAIL_LINK = splitURL[0].slice(0, splitURL[0].length - 1);
export const PAGE_LINK = `/#${splitURL[1]}`;

export const REQ = {
  GMAIL: {
    GET_MESSAGE:
      BASE_GMAIL_LINK + "?view=att&th=threadId&attid=0&disp=comp&safe=1&zw",
  },
};

export const DROPDOWN_ITEMS = {
  ITEM_ONE: "None",
  ITEM_TWO: "One Line",
  ITEM_THREE: "Two Line",
  ITEM_FOUR: "Three Line",
};

export const g_black_listed_websites = {
  "cloudhq.io": [
    "cloudhq.io/mail_track",
    "cloudhq-mkt1.net/mail_track",
    "cloudhq-mkt2.net/mail_track",
    "cloudhq-mkt3.net/mail_track",
    "cloudhq-mkt4.net/mail_track",
    "cloudhq-mkt5.net/mail_track",
    "cloudhq-mkt6.net/mail_track",
  ],
  "clio.com": ["market.clio.com/trk"],
  "litmus.com": ["emltrk.com"],
  "replymsg.com": ["replymsg.com"], // tracked by replymsg.com
  "mailtrack.io": ["mailtrack.io/trace/mail"], //https://mailtrack.io/trace/mail/efb6b4db66a2bd92d8dd41e5207ee4c225f41e16.png?u=2346345
  "gmelius.com": ["gml.email"], //https://gml.email/v2/t/image/MTUxMjAzOTAzNjJlNmY2MWYyZjJiZGIzNDMwOTY1ZWI5M2FjZjA0ZDYyJnN1a2h2aXJAa29kYW5kLmNvbSZrdXNod2Foc3VraHZpckBnbWFpbC5jb20.gif
  "streak.com": ["mailfoogae.appspot.com", "streak.com/e/o/"], //https://mailfoogae.appspot.com/t?sender=ac3VraHZpckBrb2RhbmQuY29t&type=zerocontent&guid=0a8619ba-dfe3-4017-9e3f-3ff53b56e3f8 //http://email.streak.com/e/o/eyjlbwfpbf9pzci6ik16rxdovfu2rnzhauftuufbbk1brnpjt09cb0jzqxkyv3fzvk14agfiltbsqvdvnk1erkrnrfpdutfbm1dfafvovff6vgpotfnqbednrghhukvvnk5uwtfoek01que9psj9
  "boomeranggmail.com": ["mailstat.us/tr/"], //http://mailstat.us/tr/optout-blk-nologo.png?guid=ancij5t1jamdn1ot
  "talkmarine.com": ["talkmarine.com/opens/"], //http://sub.talkmarine.com/opens/EcdnCanyEvKlusJGahaAqykeelFUdGMKYClBAJqB/blank.gif
  "contactmonkey.com": ["contactmonkey.com/api/v1/tracker"], //https://contactmonkey.com/api/v1/tracker?cm_session=e3c41c20-526d-48df-aa43-2c4bb6705d12&cm_type=open&cm_user_email=sukhvir@kodand.com
  "emailtracker.website": ["my-email-signature.link"], //https://my-email-signature.link/signature.gif?u=235553&e=14196996&v=87842041d66974a3995c891ce40bdaed243356d7e52e97b4033e1b9b5c28842e
  "toutapp.com": ["go.toutapp.com"], //http://go.toutapp.com/0611a188ac16f89a20
  "thetopinbox.com": ["thetopinbox.com/track/"], //https://api.thetopinbox.com/track/v2/open?id=659c8b4f-0952-4cdd-babe-a5aa45ac55fb
  "newtonhq.com": ["tr.cloudmagic.com"], //https://jwl2ap3q.emltrk.com/jwl2ap3q?d=sukhvir@kodand.com //https://tr.cloudmagic.com/h/v6/emailtag/tag/2.0/1512048115/71882c188ff093990f635f254ecf70f8/2/2e6f61f2f2bdb3430965eb93acf04d62/4ef08282cf27599a79961c9229dfc5f7/599a1bb5672a96178662c09e7bac00aa/newton.gif
  "rocketbolt.com": ["email.rocketbolt.com/o/"], //http://email.rocketbolt.com/o/eJxNj7FugzAURb-m3opsno3xwBJFpCpLoUPUyTJ-L4FA4tQ4ifL3JVu3M1zpnLs8bjbR-Tq7RPZOcRnDxY5YrWhT-yF10vJ782jiV5em4WfA565jWPVKkmeRPI3X9NrP4WgPvQaPShNIQMF9fzBeC4SCUEty5h3YWOVcaCGAi1xpDlkJvMizGuqylLU0G1C6lNs3yWPwE6U-zCnz4cyGyihAUzrZO26UynuhKBdEQgM68saw5f-VNWlle9rtj777vbb7QkKL9WeTTs8UGxar5TYN9zGuqimgu-BL8weWtVdP
  "hubspot.com": ["t.hubspotemail.net", "t.sidekickopen"], //https://hs-2760878.t.hubspotemail.net/e1t/o/*W7QpkfH3XhNBfW4cvPFV4-com/e1t/o/5/f18dQhb0S7ks8dDMPbW2n0x6l2B9gXrN7sKj6v4LNc8W1q0zKP7fcz6FN5v_W46d3_yKW5RBx3T1k1H6H0?si=6124185329991680&pi=9deea6c3-c4c9-4f11-81a1-c0991e8f39b6
  "bananatag.com": ["bl-1.com"], //http://s.bl-1.com/0VbT1rZ.gif
  "bombcom.com": ["bixel.io"], // https://bb.bixel.io/v1/track/open/6eff31e0-c64=3-3797-28c3-1150b2fd71bb/gm%3A160ed1782222ce73/support%40cloudHQ.net/
  "getnotify.com": ["email81.com"], //http://ww1.email81.com/case/705db1b1f363456c/zero.jpg
  "didtheyreadit.com": ["xpostmail.com"], //http://xpostmail.com/4e2c627e19d037991ac8b04b4f12b58eworker.jpg
  "cirrusinsight.com": ["tracking.cirrusinsight.com/track", "pardot.com/r/"], //https://tracking.cirrusinsight.com/track?guid=c9ff5eb5-800d-4f57-84cf-cc94935a5037&userid=0zeda5a2055cdc4a32&orgid=0ye655a2055cdc22cd //http://go.pardot.com/r/22602/1/413647888/open/1
  "cmail20.com": ["cmail20.com/t"], //https://envatomarket.cmail20.com/t/i-o-okjctd-ojduuxb/o.gif
  "udacity.com": ["udacity.com/wf/open"], //http://iclick.udacity.com/wf/open?upn=B-2BEZ5nbZ6cHinhfCXBbXsa9gZtwdTo-2BDiLtUd8KJGUVBqvWIT9HTYgT2rSLkRvNzffYaAiHzjkQX4-2BaWZLiVFdzWvdUuQR62RN-2FHVklPBvWKQju94JPyjPYb9uVUuO7-2FwafS9YEhYcnvFPxMyXM9XTKgy8z64hg-2ByobTpMIFzhsm81F8uP1a1ejs8viL4wEFfyyIOCJS2q-2BLCSxq2-2BQiBk1v14OX248PKXp3mB16fCLzLC-2B40LyIdenE09Z2wXcpW0SLYerQu4hBCYoQhIMt30ZIjeDI7BMOEld9uf4jtD-2FN49rR-2BGk-2F3vDL-2BIr25QdNh1TVSNQnwmgoTlYrFSQ7xYURVvufV2GAdoY-2FrV8NxgCctAn-2FPZmyBmPihfbtZHeoz9ZZBWubPtGOexJyShfkIccpxGCPHNyYTe-2BR01vm6ZCPC4Pllp7EaJgKQhvvsES8SYQoNmI-2BVQGqy3SY4NiMV-2FPdsvLAMliAOsQULvAk23qfnQ3Qq7qk4oE7st7f4SACasUIedlR-2Bd6U7-2BjcWbEW85QNVLwbt9lVAKAdoEnWvH81bSx-2B7IjGKjk2X4EY6tUOh-2FK6n6X6Fm4RHW-2Fdq-2Fy9910dsdQ8YEcOd5CdMAHOX9lfD2zUoFFTBi0HeXG9WWAmvCPCr4NcbqMrkuQvnS2wdZnyYr8i51UBh2UmJVLwa5-2B-2BSSjrXLmqgQXHQ0ehgyrvtmghFAgNGt2yc-2FRvaouS-2FEu5qx6QLLgEpXuhFiDKGyBnL-2FaBjVX4LRMbqk-2Fy4DITWh7B44qUkaQmS8AV23ixQNzvzctwxUt-2BwPuBN0jTvAj-2BZHSWAnvwUtPonmgmo-2BsHQ6qRbqSNFT0Jv1sNreN64d0nPmxxhTQMEcIJIulWA6YJfqrNdQsR63WE7WA7lc-2BJ //http://mailer.udacity.com/wf/open?upn=b-2bez5nbz6chinhfcxbbxsa9gztwdto-2bdiltud8kjguvbqvwit9htygt2rslkrvnzffyaaihzjkqx4-2bawzlivfdzwvduuqr62rn-2fhvklpbvwkqju94jpyjpyb9uvuuo7-2fx-2f3z8ivv7cnbacb8baczscdhnak-2fwd6mdisp1wtq50whcifgdooogmevlauhut99fohewsx-2fatinaxuc4knbprb2l6sxne2irzbqjl8p4yh9khf0q9fyvreagmzyb5m-2feom3bqgi6sr7jdu3acituf-2ftgp4ksuuzzxzcgrgfqz6ybdmr4-2bo6ti0x-2bnlakgzd2kstp6gz4mhtdoz7p-2fqri0mc8mzjvnfqfqjaf8aar0szwvdi2fc841t-2bwhrsdo9ma3ykcigarspn23gfp7sjcaqv1x2jkoxenauefnricngjomg2x5s-2bpuhehcnrosyqrhkopwviorhqirvxc-2burleuhlppg1vey6pa1vbnsvwchlvehd3nq8ercui0xnrjuhtdnzrb9crgfuuegmen5spkhxkh-2fkiialtb7mrkosxxvfzjbcd497swcgytz6y3pku7w-2bsyuij8ksr1utrmbayfptw1ps7rnuydnfiuj1gbj2hte05mqtwgas7osatfypolw0s9q2vilos9kwwbkohs9rsyeuqpip4jdh53m3yhff-2fzkdhuxi8iby0jvgyfool682byqzsixp-2f3y5hcplpsh6o9p-2fvskmhk1npxsmacuvkz9k8pr4xsjapkn8s8cdhppmukwdpbjxga0v2wajvpbaeqs5m-2bfxosksfqw-2f7msh9t8wrpservxlhuy2lnclp0vyagjns6xh-2fpnv-2bkdqewtl-2biu5dvxdxsjy62s7ou8zrwo13qtnhdsguxx0toauozw59kemlzumbpfx2hhnmjvlgcczl-2bg00y-2fz8eh8jgalp0ddkrods1zwh-2bhnkpf-2bw-2fcduqd9zqgxlxpkupn9w1uolnk6iznycsbnlioknxpb0oyjtci4iz0ub08wrptcnwudl3byshujhqekxljyhz-2bxbmuoxba935unwy6adqrlpk0mylymtk2hmecnk3tg1w-2fdf-2bz5hxekf4qmw5ovir0wrq6-2flwjywiw9cdrrqs-3d
  "mailzter.in": ["mailzter.in/ltrack"], //http://lnk.mailzter.in/ltrack?m=330&u=7278305bf51c27a8320d023e6b1af31b&client=43805&c=0000
  "ftrans03.com": ["ftrans03.com/linktrack/"], //http://pvr.ftrans03.com/linktrack/lt.pl?id=22697=K0QFBFFQAglVHlYAAFYIBQUCCEk=CBNFXEVWChAUDwpFDUp1Uw4DXVxMAQldTFcNBAQLAAVRVgMGAwZVV1dR
  "awstrack.me": ["awstrack.me"], //"http://st1ryrqk.r.us-east-1.awstrack.me/I0/010001600745afeb-67b1447d-1a6a-4f4a-8ebe-f94f6f9c5e56-000000/j2C-OdzMXM6O9lVi7v5aQ-J5ehU=33"
  "paytm.com": ["email.paytm.com/wf/open", "trk.paytmemail.com"], //http://email.paytm.com/wf/open?upn=B-2BEZ5nbZ6cHinhfCXBbXsa9gZtwdTo-2BDiLtUd8KJGUVRS88Mpv0l4ouIOpqsSSGq302iYZO9Jlm3bEZ-2BBR0HrJL5o-2F0YikfCU0cXCRmjXNfFtXkNgWPZZ6PG4ETnXsKXw2MWMkhJNiHKHkCSObrT0Jc62dkHm3lN33UIqHN4mzLiqsZ1qoncg4-2F6nI-2Be1Zd7KgiUMNRyjWd0b9SCfAQeYiRvR1XlF76s7Ox4zrKHlBw-3D //http://trk.paytmemail.com/o/nv/c/2wc9x1gfigmur5obquef.gif
  "techgig.com": ["tj_mailer_opened_count_all.php"], //https://www.techgig.com/mis/tj_mailer_opened_count_all.php?etoken=a3VzaHdhaHN1a2h2aXJAZ21haWwuY29t&activity_name=Mjk0MDgy%26template_type%3D0&current_date=2017-11-30
  "gearbest.com": ["appinthestore.com/marketing/mail-user-deal/open"], //http://ems.appinthestore.com/marketing/mail-user-deal/open?module_name=marketing_email&m=248613436&g=3589&s=12&act=read
  "fb.com": ["fb.com/trk"], //http://content.fb.com/trk?t=1&mid=MjY3LVBWQi05NDE6ODY5NDo0OTMzOjE0Njc2OjA6NjAxNDo5OjI0NDE0OjEzNzA3NjE6a3VzaHdhaHN1a2h2aXJAZ21haWwuY29t"
  "learnvibes.net": ["webwerks.learnvibes.net/opens/"], //http://webwerks.learnvibes.net/opens/bSGMKMKjAFqfZkAHgxMBybdPFUAznkMBPb/blank.gif
  "connequitymailer.com": ["connequitymailer.com/open/"], //http://contacts.connequitymailer.com/open/index/kFfglCycgJFGnkfgslxRunKMk/blank.gif
  "google.com": ["google.com/appserve/mkt/img/"], //https://www.google.com/appserve/mkt/img/AFvIGUde81CUZPyR-lvEyCtbYJ8qEG7JqOXlMBGOtg_Pw4WP.gif
  "transferwise.com": ["links.transferwise.com/track/"], //http://links.transferwise.com/track/open.php?u=30074347&id=25cf90d0610b4b049f449e2f3609d68a
  "upwork.com": ["email.mg.upwork.com/o/"], //http://email.mg.upwork.com/o/eJxNjz1uhDAUhE8DXZD_DQXFrhKugYzfM7ZYDLLNotw-RKFIM1N8M9IM9IQSw3W9Ys5mxo9ctoR9pZ8VY_MR4LKKPy7lwrUMnDBSWbCcKKq5RdKBBNBsAmDQAXfit6A_a987FAothUmQFt0ktJm4sVxJZilXVNWhZ4RqSllLhKRUNJqQjjVSk-5LDrJ98IEp1laCrHNz7OeWlsZua5365cj-ND4fi3-HdAXm1YTXH0SHCaPFfJ84MqYx_jtytyi_l5a-4Lq_TMGLg8m-YkPcSnDfY4gF0zvgOe4mlWDDbmLJo4nWb-kHCgthFA
  "creditmantri.com": ["mailer.creditmantri.com/t/"], //http://mailer.creditmantri.com/t/u55OgPdG9gtSBMAzTxoPoA/pxRAa87892s3KRl8928924763GTH0g
  "jan-sampark.nic.in": ["jansampark/read.jsp"], //http://jan-sampark.nic.in/jansampark/read.jsp?tab=pmo&lat=2017&mid=9f77ffaadc1b31a0fe494a616b5c85501fd60429
  "linkedin.com": ["linkedin.com/emimp/"], //https://www.linkedin.com/emimp/ip_ZW1jeWFqZ3RhbUZ0TWpZMk4yTXRjelk9OllqSmZZVzVsZEY5a2FXZGxjM1JmYjJaZlpHbG5aWE4wY3c9PTo=.gif
  "maxlifeinsurance.com": ["campaign.maxlifeinsurance.com/bess/get"], //http://campaign.maxlifeinsurance.com/bess/get?id=0.-1:-jakzka0u.GGGHI3XAPRHDRFKU:&1367A107340ECC7F52433611207925D8=C8BFF5553D9EE16F447F70C3381C7E3E2E875E424C3B0EF037E57BA539FF54DC472051A1
  "segment.com": ["email.segment.com/e/o/"], //http://email.segment.com/e/o/eyjlbwfpbf9pzci6ik5uttjpvgs2rndhn3nnsmtbqup6qujhrffsb0jwakzpmzzrvldcagfdy0xsqvhnnk5uwxloamd4que9psj9
  "mixpanel.com": ["mixpanel.com/trk", "mixpanel.com/track"], //http://explore.mixpanel.com/trk?t=1&mid=ndyxlu9zvi02mjq6mtm2mjoymja1ojqxmzi6mdoymtc4ojk6njy2mzo0otmxnjy0ltatmte1omt1c2h3ywhzdwtodmlyqgdtywlslmnvbq%3d%3d //http://api.mixpanel.com/track?data=eyjldmvudci6iciky2ftcgfpz25fb3blbiisicjwcm9wzxj0awvzijogeyj0b2tlbii6icjmzjrmm2rhmdbkztq4ntkzmtdiyta2n2u2odbizdi3zsisicjkaxn0aw5jdf9pzci6icjjm1zyyuhacgnrqnjimljoym1rdvkyoxqilcaidhlwzsi6icjlbwfpbcisicjjyw1wywlnbl9pzci6idixndqznzisicjqb3vybmv5x2lkijogndkwfx0%3d&img=1
  "intercom.com": ["intercom-mail.com/q/"], //https://spe.via.intercom-mail.com/q/Vg4N1P16Y7o0Rn9nqTOEwQ~~/AAAAAQA~/RgRb9rr-PlcIaW50ZXJjb21YBAAAI51CCgAD_jUUWu3FFBVBCADtCXDeQrDfUhhrdXNod2Foc3VraHZpckBnbWFpbC5jb20JUQQAAAAAR5V7InVzZXJfaWQiOiI1OGYwYjMzZWE3MjgxOTEzNWRkZTQ3NWMiLCJiaW5kaW5nIjoibm90aWZpY2F0aW9uIiwiY29udmVyc2F0aW9uX2lkIjoiMTI5ODY0NjYyOTMiLCJpbnRlcmNvbV9tZXNzYWdlX2lkIjoiMTUxNjEyNTUyIiwiYXBwX2lkIjoiajE1ZndqcG4ifQ~~
  "trello.com": ["sptrack.trello.com/q/", "i.trellomail.com/e/eo"], //http://sptrack.trello.com/q/yflw4uggty4hso9o94dbsa~~/aaaaaqa~/rgrb3xpppkeiakzvgrykdrnxc2f0bgfzc2lhbnvzwaqaaaadsaxub3rpzmljyxrpb25ccgacz-b9wr61a2tsggt1c2h3ywhzdwtodmlyqgdtywlslmnvbqlrbaaaaabhant9ew~~ //https://i.trellomail.com/e/eo?_t=cce9a87967214196ae72b08c7283fda9&_m=4b45cc6c67864f35b0dc9a2375f18bc2&_e=b908udeqny59o2oh4aw3i-nel8zichn3yuq972b3nhit_ury25fl0phhuqq5lssszbkklbcgp1xneyy7i0ksnzujnfea0av2efqn4gvtybcrzofszuxqzvvdgmjhck9vrf4o50_9x-9xjbg6rka7mlikchghwsk0rt80nuqpipy%3d
  "adobesystems.com": ["t.info.adobesystems.com"], //http://t.info.adobesystems.com//r/?id=h1f69f0f9,87536dde,1
  "appriver.com": ["appriver.com/e1t/o/"], //http://411.appriver.com/e1t/o/*w7pn22t8kn7mpw1fk1z-2dpwrn0/*n4x0kqxkrhkdw3z-sp53rzf9b0/5/f18dqhb0s6hg5gq2hymm7xwlhzj0_w4vgywx6bwp4rn4gzymlfysddd79vxctrj9w5xs_j747w3nsw2z_s742zqsvfw2t7zkx3ml_22w4c-5fv5qv4fvw7hybv54mxfbhw4gp7l571zx5bw6pkyzm21qpkfw3c53ll6rg21rvvmlnc6wg-zh102
  "unsplash.com": ["email.unsplash.com/o/"], //http://email.unsplash.com/o/ejydkd1vgzaqhn8nlbbint8dqxkuseqqzsjyl9gnygqbup99gsyqvtt1su6vhz93z866galb7yvha1wncnpxc90xturvevuknus68_k3cgty27f5b-5w6iibnwad6mfgut1kymciqwqnlboa3ag33g4ts9ixzuwilu91ezokoaw3hifdo6nbx5uuk4wqkubiobmwozgtwnnozyrld0lsvxffei_g40o9tslllnlwnjildaqxmryiyow40ilkmc-zxjflfbryztkodzkpsyj-3pj_--0ez7jwypxqkmau7ihb6lvd3bmovuipqa9gi5gvx7lh3cewys8w2xaca_pjfrrlsynfni86ocoziqpt5ec7cgkjg69haprsljbh-akkqbe2
  "unicaondemand.com": ["unicaondemand.com"], //http://miq-p4-qa-em.unicaondemand.com/c14r50a.gif?pvci=4269_16738_993873
  "producthunt.com": ["links.producthunt.com/oo/"], //http://links.producthunt.com/oo/anuaaqmxlfoaaaypfvmaaaladtyaaaaiijyaaaaaaayklqbaic_tldr0jcp-remvjtiede3dqwaf1qu/aef9e0ca/e.gif
  "mcts002.com": ["app.mcts002.com/t/"], //http://app.mcts002.com/t/7jc/cozwp
  "payback.in": ["email.payback.in/a/", "mail.payback.in/tr/"], //http://email.payback.in/a/hbaih47b85ubgb9iwdiaarnaloj/spacer.gif //http://mail.payback.in/tr/p.gif?uid=12295940387&mid=2000366927&msd=1507865414203&st=0
  "yesware.com": ["yesware.com/trk", "yesware.com/t/"], //http://go.yesware.com/trk?t=1&mid=mzq0lvbzrc0zmze6mti5mjo0mzq1oji5mte2oja6mjczndo3oju0ndqymde6a3vzahdhahn1a2h2axjaz21hawwuy29t
  "openbracket.co": ["openbracket.co/track"], //https://api.openbracket.co/track/5109685d38d9b28991d127bddf3a924a.gif
  "saleshandy.com": ["saleshandy.com/web/email/countopened"], //https://app.saleshandy.com/web/email/countopened/4134126?userid=34929
  "hunter.io": ["mltrk.io/pixel"], //https://mltrk.io/pixel/abb0xy2x9h8gpmddjumo?rid=abb0xy2x9h8gpmddjumo
  "insightly.com": ["insgly.net/api/trk"], //http://a.insgly.net/api/trk?id=emailopen&i=897605&eid=79194308&env=https%3a%2f%2fgoogleapps.insight.ly
  "agilecrm.com": ["agle2.me/open"], //https://list-manage.agle2.me/open?ns=kodand&s=1512649565924
  "salesloft.com": ["salesloft.com/email_trackers"], //http://www3.salesloft.com/email_trackers/3b71b0c8-bc3f-4147-b1bf-70f7159233a6/open.gif
  "ebsta.com": ["console.ebsta.com", "ebsta.gif", "ebsta.com/r/"], //https://console.ebsta.com/9c61315a-65a1-4e0a-b208-0a049fb11607-1512650880498/ebsta.gif //http://www2.ebsta.com/r/20102/1/898125778/open/1
  "mixmax.com": ["mixmax.com/api/track", "mixmax.com/e/o"], //https://track.mixmax.com/api/track/v2/sxi40rhzg3wemg7ny/isbvnmlk5wyk92aajxa2h2a1nni/isbvnmlslwytdgqylmdotwdzhwy3h2c1tmi/?sc=false //http://email.mixmax.com/e/o/eyjlbwfpbf9pzci6ilppszzbuufcwurfufhrqjnpovblzmuxbvbhevgifq==
  "fullcontact.com": ["fullcontact.com/wf/open"], //http://email.fullcontact.com/wf/open?upn=b-2bez5nbz6chinhfcxbbxsa9gztwdto-2bdiltud8kjguvvxemzagxyqvfvkmprvqitu24hwjt6qfcmpyvscge2nvhrbflgmpujzjeuzkwlwe9zwy5kk8wzvya2mvkxqwz-2b34qamf2siljacuq3smhp4-2bc6hkavrhi0yab4-2bzzxcsobval4u7mqbc-2ffxa6qbr1fotajmfilcqhkmhjrobfkr1evtphefrcapykleho-2fyww-2fhdwxbo20olmr8teuhcqffpej-2bsctgsaylkyn7ij44lfokwhn4xqzmv9vcbkql-2bl6wbsoup7nawa7spxnzycwo2wolxghl1qmoelmjc47erqytqjn4jcqvz68l1ssqz06stp96em7bgrhbjlnowxkj8awtrmvoxxz75-2fmjrocdnaghzozjnkgsf01wpojn93yfpqtsbbn5mr6fvwpdjl2vtynrxc9mqer3ug5tdrkgdhx-2ffgoti5kdajyq9zaggq-3d
  "freelancer.com": ["freelancer.com/1px.gif"], //https://t.freelancer.com/1px.gif?en=email-tracking.opened&acct=.freelancer.com&uniqid=2667225-25733-598e238d-a0e8d0d8
  "sendgrid.com": [
    "sendgrid.com/wf/open",
    "sendgrid.net/wf/open",
    "sendgrid.com/trk",
  ], //http://email.sendgrid.com/wf/open?upn=rbo-2btenzdj3nbgrctmzrw1w89rekfhw9e-2byb96lmex9ifkxieu1npqiswujb-2fum2t8optrjxkp29xxpzppzwf0dkqmssauqrwu1rvmzrib5guzzmywssmvmyiohviu-2ffnskjs74fw1tuy8b-2fkbnew2ied8wcu9qzidyrletv99iwvzponofxgrt8hzbnvj-2fhykpgfgzaorwk9bcthqecmpyrjhm-2fdyg1eqehkv8ogmo-3d //https://u6536608.ct.sendgrid.net/wf/open?upn=b-2bez5nbz6chinhfcxbbxsa9gztwdto-2bdiltud8kjguvvxemzagxyqvfvkmprvqitolpuqmylsyvjkpgzimrn8mnyxzdbqqm8roxor8qt9gjbbxsbtqyc6nvij6zhchyqykcc7tik4rqj0bcrsuo-2flzwtu8yiip1vzfurx-2brg9m38g2e3isaekydkfmppa94hxq7ghsehwar63l50ys5jbqg0qtp-2fue88op38cytemxrdnw5xa58azaflpmdds1-2bis4dtfv-2b2oxzofrx2arko3xg0dvfuntq-2fx-2ffkga8wihkc8wufmjmmqjbuspjsgfaekhxzqyq-2f0qacyk1wg9qulgdiphe5hyad8wayrwsizs4xfry99jkbp-2fgjrkyga1z90c8qxc5qr1l5jtdcrnrj5q-3d-3d
  "trackapp.io": [
    "trackapp.io/b/",
    "trackapp.io/r/",
    "trackapp.io/static/img/track.gif",
  ], //http://www.trackapp.io/b/12e587a2db5411e78ab1005056a3018b.png //http://www.trackapp.io/r/12e587a2db5411e78ab1005056a3018b.png //http://www.trackapp.io/static/img/track.gif
  "wildapricot.com": ["wildapricot.com/o/", "wildapricot.org/emailtracker"], //http://email.wildapricot.com/o/208/1766073/4c4d327272b3724966a776a64c5aa361.gif //https://kodand.wildapricot.org/emailtracker/emailtracker.ashx?emailcode=php3zqp5pzu5oymdz1zdplrjsfxr21vu5svjypprz%2biiqz%2fo5q3onve5nddbhoi%2bzl6rl7gyojqdaiqmgupstjxeszyvqqhaqunmfmuisjo%3d
  "mailtag.io": ["mailtag.io/email-event"], //https://app.mailtag.io/email-event/cb4835c2-db57-11e7-ba3b-06fc3a4abb7e.png?ts=1585414576
  "amazonappservices.com": [
    "amazonappservices.com/trk",
    "amazonappservices.com/r/",
    "awscloud.com/trk",
  ], //http://go.amazonappservices.com/trk?t=1&mid=mdcwlupnts0zotg6mte0mdi6ndkzmtoxmtu3mjowojexmtczojk6mtiymdy6ndcwodu3omt1c2h3ywhzdwtodmlyqgdtywlslmnvbq%3d%3d //http://m.amazonappservices.com/r/296652/1/85828237/open/1 //http://email.awscloud.com/trk?t=1&mid=mteylvrats03njy6mtawnzexojm1otqyojixnjkznzowojywntqwojk6mjawmzm4ojyzmtaxnzm6a3vzahdhahn1a2h2axjaz21hawwuy29t
  "marketo.com": ["marketo.com/trk"], //http://info.marketo.com/trk?t=1&mid=ntyxluhzry05mzc6nde2ndy0oji0nzy2nzo4otq2mtg6mdoymza4ntk6oto3mjmymtc6ndu5ote5nzc6c3vrahzpckbrb2rhbmquy29t
  "flipkart.com": ["flipkart.com/t/open"], //http://l.flipkart.com/t/open/h4siaaaaaaaaab2nyw6cmbre_-wuqamrqmelicsqymyfie7qpugdtul5idh-uxd3mzknmx9yin0hgjcctsr0eich3kcmpfajq2mulew0z5jhd5aesa65wciwb1jrurt5bf-qheeuxyw_prevhtplgcfiqp17_zevwl6ymiuqy-16l7lqnj84ibu99mbolj_y4j118p0bl8imfpoaaaa=
  "dyn.com": ["dynect.net/trk.php"], //http://trk.email.dynect.net/trk.php?a=/o2/819/qbobtgxouczdo5t3gy2kojxlnmqdalhbtk%2b8sixrnt%2bibbs3tsezxjpe7ii0m71okw0b%2fxfcbq1l1bajdd5h8y9o5p4ydqywsj3umvyhkks%3d/i.gif&i=20150711044421.000001124837%40mail6-02-ewr.dyndns.com&x=
  "boxbe.com": ["boxbe.com/stfopen"], //http://www.boxbe.com/stfopen?tc_serial=21934376351&tc_rand=1422051800&utm_source=stf&utm_medium=email&utm_campaign=invite_follow_ga&utm_content=lastchance_001
  "dropbox.com": ["dropbox.com/l/"], //https://www.dropbox.com/l/cihxqhno3pnycriiis1crd
  "playdom.com": ["playdom.com/g"], //http://weblogger-dynamic-lb.playdom.com/g?app=email_service&context=citygirl&user_id=769672001441100&app_locale=en_us&network=d&view_network=d&tag=game_action&action=email_open&message=email-citygirl_ds_en_us-triggered-citygirlregistration-20130730-0
  "grammarly.com": ["grammarly.com/open"], //http://click.send.grammarly.com/open.aspx?ffcb10-fe9815767760077d72-fe26117872660279761674-fe9213707567007a7d-ff66177477-fe2e157473640779731776-ff311c757464
  "magento.com": ["magento.com/trk", "magento.com/wf/open"], //http://email2.magento.com/trk?t=1&mid=ntg1ludhrc05ntk6nzc1nzo5mtk3ojm2mza2oja6otk5nzo5ojixode4ojeymtqxnjc6a3vzahdhahn1a2h2axjaz21hawwuy29t //http://mail.magento.com/wf/open?upn=b-2bez5nbz6chinhfcxbbxsa9gztwdto-2bdiltud8kjguxezkstpbm95hfjyaxvbo56qbj39u8uul5zpvqlkygyxilb-2fz-2bd6eqit3z3sydp3ni3p60bdbxwdixymxhwmqsxnaofculdk3glmeley-2bf-2bgck0clcmj0qj-2bi0wxpjxlrli1ilqifa-2fdsmstgjofrwf2nbos5gdijdregthrjxjzunhkfoilvjsjb5vfvxi0i0-3d
  "amazon.com": ["/gp/r.html", "/gp/forum/email/tracking"], //https://www.amazon.in/gp/r.html?c=y4er1n2fr8u9&k=ri1eslthufjl&m=urn:rtfm:msg:2017120700151114e976c6425c434ca2518c3b46c0c46f&r=2qcdh081j25kp&t=e&u=https%3a%2f%2fimages-eu.ssl-images-amazon.com%2fimages%2fg%2f01%2fnav%2ftransp.gif&h=kybshhzwrqasyd0jvduaaal8obma //https://www.amazon.in/gp/forum/email/tracking?ie=utf8&analyticsid=aoepd8n3ccw0c.txhaxof466scp3&application=forums&category=asktheowners&emailtype=ato&eventname=emailopen //https://www.amazon.com/gp/r.html?c=39lfuxz5e373y&k=aoepd8n3ccw0c&m=urn:rtn:msg:201708281233481cfeab5c73754dc5b832aa240c00p0na&r=1flcq1v23gi0j&t=o&u=https%3a%2f%2fimages-na.ssl-images-amazon.com%2fimages%2fg%2f01%2fnav%2ftransp.gif&a=ml8zmfhl9fdnl1fkjjw9fwdujw0a&h=i8nvaappsdpsowktsqjkkhrocf8a&ref_=pe_2601610_251834100_opens
  "cprpt.com": ["/o.aspx?t="], //https://www.cprpt.com/relianceindia/o.aspx?t=50162.10007.20613.17803.0.1.n.19745083.288793.0&e=kushwahsukhvir@gmail.com
  "monsterindia.com": ["monsterindia.com/corp_news_unsubscribed/track.html"], //http://recruiter.monsterindia.com/corp_news_unsubscribed/track.html?mailer=mim60824&uid=14070329&rid=12818817
  "zeemail.in": ["zeemail.in/ltrack"], //http://gecmailer.zeemail.in/ltrack?m=4682&u=7278305bf51c27a8320d023e6b1af31b&client=18233&c=0000
  "Edgesuite.net": ["epidm.edgesuite.net"], //http://epidm.edgesuite.net/dell/apj/con/in/fy18q3w06/01325922/spacer.gif
  "tatadocomobusiness.com": ["tatadocomobusiness.com/rts/"], //http://l.e.tatadocomobusiness.com/rts/open.aspx?tp=i-h43-di-az-ebld-1t-3b9v-1c-ewml-21ki6r
  "greenmailinc.com": ["greenmail.co.in"], //http://vodafoneindia.greenmail.co.in/vodafoneindia/ut.php?m=4381&u=7278305bf51c27a8320d023e6b1af31b
  "mailcoral.com": ["mailcoral.com/open"], //http://rio.mailcoral.com/open/index/bzaepcwfdzekmkzafrymelkrb/blank.gif
  "mailinifinity.com": ["mailinifinity.com/ptrack"], //http://sccc.mailinifinity.com/ptrack?g=1&m=5807&eu=almjawehavztcg==&u=3725789320a83a236206ec7d5110ff0a&client=153&c=0000
  "opicle.com": ["track.opicle.com"], //http://track.opicle.com/aff_i?offer_id=5790&aff_id=5931&file_id=36580
  "formirror.com": ["formirror.com/open/"], //http://kp.formirror.com/open/index/kwkblcxwfkvcrbgbcpsnsmbnk/blank.gif
  "blueshift.com": ["blueshiftmail.com/wf/open", "getblueshift.com/track"], //http://e.blueshiftmail.com/wf/open?upn=b-2bez5nbz6chinhfcxbbxsa9gztwdto-2bdiltud8kjguv1tp5t7bpwsbhuclp5ujuk3hqkxlkkulqn58boc7-2f6m2x-2fy78wr3oc-2fro6jcknj1tcdo9t48ac7mkuaa28zgtzfglnbwlzqfjzczjbnwsz42lgsadq3f0bo9-2biu-2biraoh44z6mb4ubkmibgqwaaf594s-2fftviba72v6z53scg8hzc5zjfhxvmpgf28bhmymmp1v1itqxwev7ljakt7zesj0g-2babqscopzkt0bl2eh4wpl0udpz4tjnplswcamsrlju-2f1capppwku-2flcrcljsqhyop-2bu1tffbz4hxfdkx4po2c1b9ze7i41dn2fh4-2fcd3vkg0dx1ynsid41efxnmhhv1seix7ycqenewwbzrzhkupu3m7naa0zdd92nxngl6x35w9nnoidmsx7rbz8befen-2fircj8egj6jdyky6b-2flukh6d9tmk6csnvmonfl2nd0bbdv8pewo7li-2f7bwhmqudt-2bnmt-2fxb8bcjo0u-2f5kl-2fcfdpgwjkj32wjnf45pmwhat5g3qd7uj0gvst5hhwmlobmpvc7tttyxjyu47jkfrs5x-2fkzkg-2bcn64fvjlv8jzf7weh0frz45gpgunyjmbozaxmwozn3oatgb8hgunsoijhlk-2bggfbjaljqgjwyv9catwdp84y4qtr3xn3xq31v37clngspv-2f-2f0-2ffazyqekk31bpg-3d-3d //http://api.getblueshift.com/track?uid=599bcae1-9e54-4cfa-af84-1f6637296dbe&mid=65ff23f6-998e-4f26-b40b-4daf9623d8f5&eid=00307999-9d9c-4510-adcb-3fe917831f69&a=open
  "mailchimp.com": ["list-manage.com/track"], //https://peopleperhour.us5.list-manage.com/track/open.php?u=fd10c1665ff22bc75232b05dd&id=bbc5144fb2&e=ec54a149b2
  "prolificmail.com": ["prolificmail.com/ltrack"], //http://emaila.prolificmail.com/ltrack?g=1&m=190&eu=vaufb1ufblmdua==&u=7278305bf51c27a8320d023e6b1af31b&client=39835&c=0000
  "primevideo.com": ["primevideo.com/gp/r.html"], //https://r.eu.primevideo.com/gp/r.html?c=141ux9vvbn3c7&k=ri1eslthufjl&m=urn:rtn:msg:20171125051250e6313e14b4fa4e23885eacb69480p0eu&r=2qcdh081j25kp&t=e&u=https%3a%2f%2fimages-eu.ssl-images-amazon.com%2fimages%2fg%2f01%2fnav%2ftransp.gif&h=alz1mjrgotcpruxnxxnwqwjlfgwa&ref_=pe_3431541_226021221_open
  "google-analytics.com": ["google-analytics.com/collect"], //http://www.google-analytics.com/collect?v=1&tid=ua-22527720-1&cid=1677702&t=event&ec=email&ea=open&el=1677702&cs=weekly-newsletter&cm=email&cn=newsletter-2017-11-23&cm1=1&ni=1
  "365offers.trade": ["trk.365offers.trade"], //http://trk.365offers.trade/campaigns/jy878cgnp030f/track-opening/5a0c5a1c28c1e
  "dell.com": ["ind.dell.com"], //http://ind.dell.com/14223ac44layfor2iacxd5uqaaaaaadpl7imq3ao5piyaaaaa
  "responder.co.il": ["opens.responder.co.il"], //https://opens.responder.co.il/239421373/aecf0a32b9eb1faefced891fc3910ef1/2877017
  "quora.com": ["quora.com/qemail/mark_read"], //https://www.quora.com/qemail/mark_read?ct=1512738888409448&et=2&id=8p8mqwnni_iyxof8key_5a%3d%3d&request_id=1186252156925493600&src=1&st=1512738888409448&stories=1_di1jwuzls2%7c1_a25mklvfejr%7c1_mzjxfubdepf%7c1_ojpsqpxa2qm%7c1_fzl5438zlqb%7c1_90hc4kc4rnq%7c1_bzsikenxzms%7c1_vfziim933cu%7c1_1hqnudsx52%7c1_xw2gg6lmri2&uid=o8kifaxvzbm&v=0
  "facebook.com": [
    "facebook.com/email_open_log_pic.php",
    "facebookdevelopers.com/trk",
  ], //https://www.facebook.com/email_open_log_pic.php?mid=55ee2a734daeeg3f3cabe2g55ee2f17fd0ebg2 ////http://info.facebookdevelopers.com/trk?t=1&mid=nzezlvlgus0wodq6mze2njoymjc3ojy0mjg6mdozmjgyojk6ntyxotoxmjiwmtaxmtprdxnod2foc3vrahzpckbnbwfpbc5jb20%3d
  "hdfcbank.com": ["hdfcbank.net/r/"], //http://t.mailer.hdfcbank.net/r/?id=hae4f20b1,a8bfb17a,1
  "vcommission.com": ["tracking.vcommission.com/aff_i"], //http://tracking.vcommission.com/aff_i?offer_id=126&aff_id=1124&file_id=114452
  "netecart.com": ["netecart.com/ltrack"], //http://panela.netecart.com/ltrack?g=1&m=29&eu=valwuwiea1bsuw==&u=7278305bf51c27a8320d023e6b1af31b&client=49938&c=0000
  "getpocket.com": ["email.getpocket.com/wf/open"], //http://email.getpocket.com/wf/open?upn=b-2bez5nbz6chinhfcxbbxsa9gztwdto-2bdiltud8kjguv1fapgfxk71h3o3y6j4sa9yzvfpfs6oyiq3byy8dymw57ll6hy-2bfq8ipyadqnv9srcbwrjejihhkz9qx6rmjdmzitsvzd19s10jcnbxnnd7jx-2by62yfqvey5duibu6apg07l2vge0kzszl3n6dmhysq8ivpq76u-2fpmnhascgrygdrotjjcbtrd1lrfrnl7poqase-2ftkcspnit0rrs3gshysdu-2fkebe-2fehwq4xx9kzgi597abcj9tsw72aqs7htw6s82xsnokonxrov5-2b2jkqg3yxkafyy63j49fcs4w5zsja-3d-3d
  "bookmyshow.com": ["bookmyshow.com/tr/p.gif"], //http://updates.bookmyshow.com/tr/p.gif?uid=18013213620&mid=1801094124&msd=1509978606232&st=0 //http://entertainment.bookmyshow.com/tr/p.gif?uid=14045686496&mid=1401152139&msd=1501063812874&st=0
  "driftem.com": ["driftem.com/ltrack"], //http://lnk.pool.driftem.com/ltrack?m=3965&u=7278305bf51c27a8320d023e6b1af31b&client=8192&c=0000
  "browserstack.com": ["browserstack.com/images/mail/track-open"], //http://cdnmail.browserstack.com/images/mail/track-open.png?token=742428&type=image&user_type=free&genre=automate-real-devices
  "absolutesoftware-email.com": ["click.absolutesoftware-email.com/open.aspx"], //http://click.absolutesoftware-email.com/open.aspx?ffcb10-fe511378776d017b7713-fdcc15737461067f731670706c-ff001775746707-ff5d177872-fe2413797063057e771479-ffce15
  "apple.com": ["apple_email_link/spacer"], //http://c.apple.com/img/apple_email_link/spacer2.gif?v=2&a=pxkbul0ehn2drturcvuusfiukztlgmxlkwi4f2bzoxbo0yiwffi3vayuy7iwuuahwfonlldtt4qold%2buc1jvozksh2exi%2bef8wethzeatwjz%2f9v25m4ew1qdprw9kwd%2bbwn8cwknzfyuyjfbezn5ked5twhkwiqi8mw5ghghfk0%3d
  "eventsinyourarea.com": ["eventsinyourarea.com/track/"], //http://r.eventsanddeals.eventsinyourarea.com/track/open/dewixh251qsfh.gif
  "intel.com": ["intel.com/e/footerimages/footerimage1"], //http://app.plan.intel.com/e/footerimages/footerimage1?elq=253f5ac43f3d48f9a73fd47a6ee14f54&siteid=334284386
  "headstart.in": ["sendy.headstart.in/t/"], //http://sendy.headstart.in/t/521ote2apwavgz5681efaa/o7noaggfe9hev892hyrvvclw
  "hourlie.com": ["mailchap.hourlie.com/mailchap/site/image/"], //http://mailchap.hourlie.com/mailchap/site/image/4527?sid=973341
  "sendinblue.com": ["sendibm4.com/track/", "sendibt3.com/track/"], //http://10gyu.r.ah.d.sendibm4.com/track/2crcv34lk0rh.gif //http://10gyu.r.bh.d.sendibt3.com/track/s94ad1j6o94d.gif
  "getbase.com": ["getbase.com/e1t/o/"], //http://resources.getbase.com/e1t/o/*w83fqhq7w5pbcw62fd174qsxyd0/*w7xpdjn6ycpzyw1-hbgz3wbqjk0/5/f18dqhb0s6hg5gpz63m3br_ghzj1gw6vwh134lqbdgn4gzymlfysddd79vxctrj9w5xs_j747w3nsw2z_s742zqsvfw2t7zkx3ml_22w4c-5fv5qv4fvn7hgqynbqhckw3fd0wg72jnlfw8mqgqw8flbjsw51v0hd28hl2hw1mkddw2tkkc4101
  "mention.com": ["mention.com/e/o/"], //http://email.mention.com/e/o/eyjlbwfpbf9pzci6ik1qttjoake2rnjyz0ftuufbbk1brndwdw54b0jvsk1im3u0vkhcafpyakl1qvcwnk5urtnnvekxque9psj9
  "metadata.io": ["metadata.io/e1t/o/"], //http://offers.metadata.io/e1t/o/*w7brzrj8glychw8f8_rj4ssdym0/*w45y2n1480bchn2n0bd1vdj5t0/5/f18dqhb0s6hb5grc-5n6pd6bshzj1qw5d6rwg4vy2mqn4gzymlfysddd79vxctrhbw5xs_j747w3nsw2z_s742zqsvfw2t7zkx3ml_22w4c-5fv5qdn3fw7j9bwg1s93yyw48vjzg4kz0z3w80h9kt6db8mvw8wcnvr7bdtsbsbpx5gs71q102
  "rs6.net": ["rs6.net/on.jsp"], //http://r20.rs6.net/on.jsp?a=1124049976790&r=3&c=4ef9c980-f752-11e5-ae89-d4ae527548e1&d=1128441062023&ch=4fe058f0-f752-11e5-af1e-d4ae527548e1&ca=632c5696-3b1a-48fe-9c76-10b648e4af62&o=https://imgssl.constantcontact.com/ui/images1/s.gif
  "egocdn.com": ["egocdn.com/syn/mail_s.php"], //http://mx.egocdn.com/syn/mail_s.php?m=1063156575&g=16672&s=12&act=read
  "sendpulse.email": ["stat-pulse.com"], //http://stat-pulse.com/imgs/mzy5odyymw==/6188945c39dfb9774b608ebc432974cb/h/28edd3380a1c17cf65b137fe96516659
  "en25.com": ["en25.com/e/"], //http://s608.t.en25.com/e/footerimages/footerimage1?elq=43511180e5904793864ce77d8efdba87&siteid=608
  "runtastic.com": ["runtastic.com/mo/"], //http://link.runtastic.com/mo/gekrwosjq4_645781705_683596_48852_369514.gif
  "asus.com": ["emditpison.asus.com"], //http://emditpison.asus.com/hl/0/3964e9b4/0/874fcf/887a0b/8124b6/1292/370.jpg
  "apptivo.com": ["apptivo.com"], //pending - could not test as they want me to purchase paid plan before I can send tracking email
  "livehive.com": ["livehive"], //pending - could not test as they want to provide a demo and then they will enable my account
};

export const g_black_listed_string_params = [
  "track",
  "/wf/open",
  "/o/",
  "/tr/",
  "/trk",
  "open",
  "appmixmaxcomapitrack",
  "followup",
  "rightinbox",
  "spacer.gif",
  "/click.emails",
];

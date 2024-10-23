
function FindProxyForURL(url, host) {
  // Variables defined to proxy or send direct
  var proxy = 'PROXY relay.lsaccess.me:62312';
  var direct = 'DIRECT';
  // Internal IP Ranges
  if (
    isInNet(host, "127.0.0.0", "255.0.0.0") ||
    isInNet(host, "10.0.0.0", "255.0.0.0") ||
    isInNet(host, "172.16.0.0", "255.240.0.0") ||
    isInNet(host, "192.168.0.0", "255.255.0.0") ||
    isInNet(host, "169.254.0.0", "255.255.0.0")
  ) {
    return direct;
  }
  // Send Plain Hostnames DIRECT
  if (isPlainHostName(host))
    return "DIRECT";
  // Send FTP traffic DIRECT
  if (url.substring(0, 4) === 'ftp:') {
    return direct;
  }
  // Entries to cover subdomains
  var no_proxy_subs = Array(
	".com",
	".tylertech.com",
	".infinitecampus.com",
	".infinitecampus.org",
	".accounts.google.com",
	".ssl.gstatic.com",
	".play.google.com",
	".googleapis.com",
	".dropboxstatic.com",
	".dropbox.com",
	".montgomery.schoolsplp.com",
	".webex.com",
	".zoom.us",
	".zoom.com",
	".meetzoom.net",
	".cloudfront.net",
	".cricut.com",
	".msedd.com",
	".ky.msedd.com",
	".collegeboard.org",
	".scores.collegeboard.org",
	".10.165.64.84",
	".renaissance-go.com",
	".veritime.aesoponline.com",
	".teamviewer.com",
	".riot.com",
	".riotgames.com",
	".apple.com",
	".secure.logmeinrescue.com",
	".logmeinrescue.com",
	".logmein123.com",
	".oms.cummins.com",
	".cummins.com",
	".cloudflareinsights.com",
	".vidyard.com",
	".cookielaw.org",
	".acquia.com",
	".testnav.com",
	".pearsontestcontent.com",
	".www.epicgames.com",
	".account-public-service-prod03.ol.epicgames.com",
	".launcherwaitingroom-public-service-prod06.ol.epicgames.com",
	".launcher-public-service-prod06.ol.epicgames.com",
	".launcher-website-prod07.ol.epicgames.com",
	".tracking.epicgames.com",
	".accounts.launcher-website-prod07.ol.epicgames.com",
	".accounts.epicgames.com",
	".cdn1.unrealengine.com",
	".cdn2.unrealengine.com",
	".datarouter.ol.epicgames.com",
	".entitlement-public-service-prod08.ol.epicgames.com",
	".orderprocessor-public-service-ecomprod01.ol.epicgames.com",
	".catalog-public-service-prod06.ol.epicgames.com",
	".friends-public-service-prod06.ol.epicgames.com",
	".lightswitch-public-service-prod06.ol.epicgames.com",
	".accountportal-website-prod07.ol.epicgames.com",
	".ut-public-service-prod10.ol.epicgames.com",
	".epicgames-download1.akamaized.net",
	".download.epicgames.com",
	".download2.epicgames.com",
	".download3.epicgames.com",
	".download4.epicgames.com",
	".static-assets-prod.epicgames.com",
	".store-site-backend-static.ak.epicgames.com",
	".store-content.ak.epicgames.com",
	".library-service.live.use1a.on.epicgames.com",
	".datastorage-public-service-liveegs.live.use1a.on.epicgames.com",
	".fastly-download.epicgames.com",
	".www.apple.com",
	".login.live.com",
	".compliance.microsoft.com",
	".complianceclientsdf.blob.core.windows.net",
	".qrsiediscnam.blob.core.windows.net",
	".dc.services.visualstudio.com",
	".app.pendo.io",
	".d.la4-c4-ia2.salesforceliveagent.com",
	".mudjediscnam.blob.core.windows.net",
	".blob.core.windows.net",
	".windows.net",
	".redirect.psst.com",
	".psst.com",
	".www.arcgis.com",
	".arcgis.com",
	".minecrafteduservices.com",
	".playfabapi.com",
	".education.minecraft.net",
	".self.events.data.microsoft.com",
	".meedownloads.blob.core.windows.net",
	".contentstorage.onenote.office.net",
	".meedownloads.azureedge.net",
	".cognitiveservices.azure.com",
	".learningtools.onenote.com",
	".minecraft.makecode.com",
	".makecode.com",
	".trg-minecraft.userpxt.io",
	".pxt.azureedge.net",
	".api.github.com",
	".www.tynker.com",
	".eBLVD.com",
	".50.18.193.132",
	".52.9.35.110",
	".52.8.157.230",
	".52.9.66.110",
	".52.71.220.205",
	".52.71.229.216",
	".52.5.151.205",
	".federation.ems.army.mil",
	".app.joinhandshake.com",
	".joinhandshake.com",
	".testadmin.act.org",
	".tn.actonline.act.org",
	".act.org",
	".savvasrealize.com",
	".ocsp.apple.com",
	".gimkitconnect.com",
	".outlook.office365.com",
	".r4.res.office365.com",
	".renlearn.com",
	".renaissance.com",
	".classroom.google.com",
	".renlearnrp.com",
	".drcedirect.com",
	".pearson.com",
	".starttest.com",
	".kiteaai.org",
	".khanacademy.org",
	".comodoca.com",
	".support.hp.com",
	".gimkit.com",
	".youtube-nocookie.com",
	".makerbot.com",
	".drc-centraloffice.com",
	".edpuzzle.com",
	".logmein.com",
	".savvas.com",
	".canva.com",
	".lsrelay-reports-production.s3-us-west-2.amazonaws.com",
	".pearsonvue.com",
	".sophos.com",
	".unsplash.com",
	".donjohnston.net",
	".userback.io",
	".redirector.aerohive.com",
	".hmupdates-ng.aerohive.com",
	".extremecloudiq.com",
	".cloud-rd.aerohive.com",
	".stun.extremecloudiq.com",
	".34.67.130.64",
	".24.172.201.114",
	".connect.vpn.ky.gov",
	".secure.vpn.ky.gov",
	".army.mil",
	".goarmy.com",
	".usarmyjrotc.com",
	".osd.mil",
	".montgomery.kyschools.us",
	".Montgomery.k12.ky.us",
	".cdn.schoolpointe.com",
	".use.typekit.net",
	".www.montgomery.k12.ky.us",
	".hpsmart.com",
	".oss.hpconnected.com",
	".hp.com",
	".autodesk.com",
	".access.clic.autodesk.com",
	".clm.clic.autodesk.com",
	".accounts.autodesk.com",
	".ipm-aem.autodesk.com",
	".cdn.accounts.autodesk.com",
	".api.autodesk.com",
	".cur.autodesk.com",
	".registeronce.autodesk.com",
	".developer.api.autodesk.com",
	".sso.accounts.autodesk.com",
	".sso.connect.pingidentity.com",
	".js-agent.newrelic.com",
	".bam.nr-data.net",
	".www.nicholas.k12.ky.us",
	".www.ky.schools.bz",
	".onedrive.com",
	".onedrive.live.com",
	".g.live.com",
	".spoprod-a.akamaihd.net",
	".p.sfx.ms",
	".oneclient.sfx.ms",
	".fabric.io",
	".vortex.data.microsoft.com",
	".posarprodcssservice.accesscontrol.windows.net",
	".redemptionservices.accesscontrol.windows.net",
	".token.cp.microsoft.com",
	".tokensit.cp.microsoft-tst.com",
	".vas.samsungapps.com",
	".odc.officeapps.live.com",
	".login.windows.net",
	".login.microsoftonline.com",
	".storage.live.com",
	".kyschools.us",
	".k12.ky.us",
	".ky.us",
	".hmh-waggle-teacher.com",
	".zoomgov.com",
	".Kidshealth.org",
	".kidshealth.org",
	".10.165.129.94",
	".graphics.wsj.com",
	".myretirement.ky.gov",
	".geauga4h.org",
	".www.foundationsa-z.com",
	".myviewboard.com",
	".myviewboard.cloud",
	".www.epsb.ky.gov",
	".www.wageworks.com",
	".chat.openai.com",
	".cdn.openai.com",
	".openai.com",
	".ubuntu.com",
	".hudl.com",
	".iot.us-east-1.amazonaws.com",
	".pool.ntp.org",
	".sentry.io",
	".s3.amazonaws.com",
	".eku.edu",
	".degreeworks.eku.edu",
	".compute.amazonaws.com",
	".vcloud.blueframetech.com",
	".www.twitch.tv",
	".twitch.tv",
	".twitch.com",
	".twitchcdn.net",
	".jtvnw.net",
	".ttvnw.com",
	".ttvnw.net",
	".www.ctbi.com",
	".gstatic.com",
	".www.eku.edu",
	".amazonaws.com",
	".firebaseio.com",
	".auth.viewsonic.io",
	".testfrenzy.com",
	".timekettle.co",
	".18.118.182.109",
	".47.245.1.206",
	".54.65.25.69",
	".3.91.126.180",
	".52.9.224.190",
	".wttwo.com",
	".vimeo.com",
	".bitly.com",
	".usher.ttvnw.net",
	".beacon.js",
	".www.gstatic.com",
	".manage.microsoft.com",
	".a.manage.microsoft.com",
	".dm.microsoft.com",
	".apps.mzstatic.com",
	".updates.cdn-apple.com",
	".cert-root-public-keys-production.s3.us-west-2.amazonaws.com",
	".www.myschoolbucks.com",
	".myschoolbucks.com",
	".kyops.ky.gov",
	".ewarrants.ky.gov",
	".lessonpix.com",
	".17.0.0.0",
	".mosyle.com",
	".mosyle.io",
	".macosagent.azureedge.net",
	".oscp.apple.com",
	".roster.bassmaster.com",
	".ezbusinesscardmanagement.com",
	".brightarrow.com",
	".hpsgpo.com",
	".slack-msgs.com:443",
	".microsoft.com",
	".msftconnecttest.com",
	".apple.com",
	".ably.io",
	".twilio.com",
	".icloud.com",
	".lsmdm.com",
	".turn.anyfirewall.com",
	".q73sd1i7s5.execute-api.us-west-2.amazonaws.com",
	".d5h6hjc5h3.execute-api.us-west-1.amazonaws.com",
	".p7nvu5it0k.execute-api.us-west-2.amazonaws.com",
	".lsrelay-extensions-production.s3.amazonaws.com",
	".mzstatic.com",
	".digicert.com",
	".lsmdm.com",
	".lsfilter.com",
	".relay.school",
	".lightspeedsystems.com",
	".lightspeedsystems.app",
	".stagingls.io",
	".developmentls.io"
  );
  // Entries to cover exact match domains
  var no_proxy_exact = Array(
	".com",
	"tylertech.com",
	"infinitecampus.com",
	"infinitecampus.org",
	"accounts.google.com",
	"ssl.gstatic.com",
	"play.google.com",
	"googleapis.com",
	"dropboxstatic.com",
	"dropbox.com",
	"montgomery.schoolsplp.com",
	"webex.com",
	"zoom.us",
	"zoom.com",
	"meetzoom.net",
	"cloudfront.net",
	"cricut.com",
	"msedd.com",
	"ky.msedd.com",
	"collegeboard.org",
	"scores.collegeboard.org",
	"10.165.64.84",
	"renaissance-go.com",
	"veritime.aesoponline.com",
	"teamviewer.com",
	"riot.com",
	"riotgames.com",
	"apple.com",
	"secure.logmeinrescue.com",
	"logmeinrescue.com",
	"logmein123.com",
	"oms.cummins.com",
	"cummins.com",
	"cloudflareinsights.com",
	"vidyard.com",
	"cookielaw.org",
	"acquia.com",
	"testnav.com",
	"pearsontestcontent.com",
	"www.epicgames.com",
	"account-public-service-prod03.ol.epicgames.com",
	"launcherwaitingroom-public-service-prod06.ol.epicgames.com",
	"launcher-public-service-prod06.ol.epicgames.com",
	"launcher-website-prod07.ol.epicgames.com",
	"tracking.epicgames.com",
	"accounts.launcher-website-prod07.ol.epicgames.com",
	"accounts.epicgames.com",
	"cdn1.unrealengine.com",
	"cdn2.unrealengine.com",
	"datarouter.ol.epicgames.com",
	"entitlement-public-service-prod08.ol.epicgames.com",
	"orderprocessor-public-service-ecomprod01.ol.epicgames.com",
	"catalog-public-service-prod06.ol.epicgames.com",
	"friends-public-service-prod06.ol.epicgames.com",
	"lightswitch-public-service-prod06.ol.epicgames.com",
	"accountportal-website-prod07.ol.epicgames.com",
	"ut-public-service-prod10.ol.epicgames.com",
	"epicgames-download1.akamaized.net",
	"download.epicgames.com",
	"download2.epicgames.com",
	"download3.epicgames.com",
	"download4.epicgames.com",
	"static-assets-prod.epicgames.com",
	"store-site-backend-static.ak.epicgames.com",
	"store-content.ak.epicgames.com",
	"library-service.live.use1a.on.epicgames.com",
	"datastorage-public-service-liveegs.live.use1a.on.epicgames.com",
	"fastly-download.epicgames.com",
	"www.apple.com",
	"login.live.com",
	"compliance.microsoft.com",
	"complianceclientsdf.blob.core.windows.net",
	"qrsiediscnam.blob.core.windows.net",
	"dc.services.visualstudio.com",
	"app.pendo.io",
	"d.la4-c4-ia2.salesforceliveagent.com",
	"mudjediscnam.blob.core.windows.net",
	"blob.core.windows.net",
	"windows.net",
	"redirect.psst.com",
	"psst.com",
	"www.arcgis.com",
	"arcgis.com",
	"minecrafteduservices.com",
	"playfabapi.com",
	"education.minecraft.net",
	"self.events.data.microsoft.com",
	"meedownloads.blob.core.windows.net",
	"contentstorage.onenote.office.net",
	"meedownloads.azureedge.net",
	"cognitiveservices.azure.com",
	"learningtools.onenote.com",
	"minecraft.makecode.com",
	"makecode.com",
	"trg-minecraft.userpxt.io",
	"pxt.azureedge.net",
	"api.github.com",
	"www.tynker.com",
	"eBLVD.com",
	"50.18.193.132",
	"52.9.35.110",
	"52.8.157.230",
	"52.9.66.110",
	"52.71.220.205",
	"52.71.229.216",
	"52.5.151.205",
	"federation.ems.army.mil",
	"app.joinhandshake.com",
	"joinhandshake.com",
	"testadmin.act.org",
	"tn.actonline.act.org",
	"act.org",
	"savvasrealize.com",
	"ocsp.apple.com",
	"gimkitconnect.com",
	"outlook.office365.com",
	"r4.res.office365.com",
	"renlearn.com",
	"renaissance.com",
	"classroom.google.com",
	"renlearnrp.com",
	"drcedirect.com",
	"pearson.com",
	"starttest.com",
	"kiteaai.org",
	"khanacademy.org",
	"comodoca.com",
	"support.hp.com",
	"gimkit.com",
	"youtube-nocookie.com",
	"makerbot.com",
	"drc-centraloffice.com",
	"edpuzzle.com",
	"logmein.com",
	"savvas.com",
	"canva.com",
	"lsrelay-reports-production.s3-us-west-2.amazonaws.com",
	"pearsonvue.com",
	"sophos.com",
	"unsplash.com",
	"donjohnston.net",
	"userback.io",
	"redirector.aerohive.com",
	"hmupdates-ng.aerohive.com",
	"extremecloudiq.com",
	"cloud-rd.aerohive.com",
	"stun.extremecloudiq.com",
	"34.67.130.64",
	"24.172.201.114",
	"connect.vpn.ky.gov",
	"secure.vpn.ky.gov",
	"army.mil",
	"goarmy.com",
	"usarmyjrotc.com",
	"osd.mil",
	"montgomery.kyschools.us",
	"Montgomery.k12.ky.us",
	"cdn.schoolpointe.com",
	"use.typekit.net",
	"www.montgomery.k12.ky.us",
	"hpsmart.com",
	"oss.hpconnected.com",
	"hp.com",
	"autodesk.com",
	"access.clic.autodesk.com",
	"clm.clic.autodesk.com",
	"accounts.autodesk.com",
	"ipm-aem.autodesk.com",
	"cdn.accounts.autodesk.com",
	"api.autodesk.com",
	"cur.autodesk.com",
	"registeronce.autodesk.com",
	"developer.api.autodesk.com",
	"sso.accounts.autodesk.com",
	"sso.connect.pingidentity.com",
	"js-agent.newrelic.com",
	"bam.nr-data.net",
	"www.nicholas.k12.ky.us",
	"www.ky.schools.bz",
	"onedrive.com",
	"onedrive.live.com",
	"g.live.com",
	"spoprod-a.akamaihd.net",
	"p.sfx.ms",
	"oneclient.sfx.ms",
	"fabric.io",
	"vortex.data.microsoft.com",
	"posarprodcssservice.accesscontrol.windows.net",
	"redemptionservices.accesscontrol.windows.net",
	"token.cp.microsoft.com",
	"tokensit.cp.microsoft-tst.com",
	"vas.samsungapps.com",
	"odc.officeapps.live.com",
	"login.windows.net",
	"login.microsoftonline.com",
	"storage.live.com",
	"kyschools.us",
	"k12.ky.us",
	"ky.us",
	"hmh-waggle-teacher.com",
	"zoomgov.com",
	"Kidshealth.org",
	"kidshealth.org",
	"10.165.129.94",
	"graphics.wsj.com",
	"myretirement.ky.gov",
	"geauga4h.org",
	"www.foundationsa-z.com",
	"myviewboard.com",
	"myviewboard.cloud",
	"www.epsb.ky.gov",
	"www.wageworks.com",
	"chat.openai.com",
	"cdn.openai.com",
	"openai.com",
	"ubuntu.com",
	"hudl.com",
	"iot.us-east-1.amazonaws.com",
	"pool.ntp.org",
	"sentry.io",
	"s3.amazonaws.com",
	"eku.edu",
	"degreeworks.eku.edu",
	"compute.amazonaws.com",
	"vcloud.blueframetech.com",
	"www.twitch.tv",
	"twitch.tv",
	"twitch.com",
	"twitchcdn.net",
	"jtvnw.net",
	"ttvnw.com",
	"ttvnw.net",
	"www.ctbi.com",
	"gstatic.com",
	"www.eku.edu",
	"amazonaws.com",
	"firebaseio.com",
	"auth.viewsonic.io",
	"testfrenzy.com",
	"timekettle.co",
	"18.118.182.109",
	"47.245.1.206",
	"54.65.25.69",
	"3.91.126.180",
	"52.9.224.190",
	"wttwo.com",
	"vimeo.com",
	"bitly.com",
	"usher.ttvnw.net",
	"beacon.js",
	"www.gstatic.com",
	"manage.microsoft.com",
	"a.manage.microsoft.com",
	"dm.microsoft.com",
	"apps.mzstatic.com",
	"updates.cdn-apple.com",
	"cert-root-public-keys-production.s3.us-west-2.amazonaws.com",
	"www.myschoolbucks.com",
	"myschoolbucks.com",
	"kyops.ky.gov",
	"ewarrants.ky.gov",
	"lessonpix.com",
	"17.0.0.0",
	"mosyle.com",
	"mosyle.io",
	"macosagent.azureedge.net",
	"oscp.apple.com",
	"roster.bassmaster.com",
	"ezbusinesscardmanagement.com",
	"brightarrow.com",
	"hpsgpo.com",
	"slack-msgs.com:443",
	"microsoft.com",
	"msftconnecttest.com",
	"apple.com",
	"ably.io",
	"twilio.com",
	"icloud.com",
	"lsmdm.com",
	"turn.anyfirewall.com",
	"q73sd1i7s5.execute-api.us-west-2.amazonaws.com",
	"d5h6hjc5h3.execute-api.us-west-1.amazonaws.com",
	"p7nvu5it0k.execute-api.us-west-2.amazonaws.com",
	"lsrelay-extensions-production.s3.amazonaws.com",
	"mzstatic.com",
	"digicert.com",
	"lsmdm.com",
	"lsfilter.com",
	"relay.school",
	"lightspeedsystems.com",
	"lightspeedsystems.app",
	"stagingls.io",
	"developmentls.io"
  );
  // Match the above lists to send direct
  for (var iter = 0; iter < no_proxy_subs.length; ++iter) {
    if (dnsDomainIs(host, no_proxy_subs[iter])) {
      return direct;
    }
  }
  for (var iter = 0; iter < no_proxy_exact.length; ++iter) {
    if (localHostOrDomainIs(host, no_proxy_exact[iter])) {
      return direct;
    }
  }
  // DEFAULT RULE: All other traffic sent to proxy.
  return proxy;
}
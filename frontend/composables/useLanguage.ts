import { computed } from 'vue'

export type Language = 'en' | 'bn'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      episodes: 'Episodes',
      manifesto: 'Ideas Hub',
      guests: 'Presidents Wall',
      about: 'About',
      partners: 'Partners',
      contact: 'Contact',
      apply: 'Apply to be President'
    },
    hero: {
      badge: 'Unscripted • Live • Youth-Led Governance',
      titleLine1: '30 Minutes In Power.',
      titleLine2: 'A Lifetime of Ideas.',
      subtitle: 'What would YOU do if you ruled the country? We hand the presidential chair to bold young leaders for 30 minutes of unscripted governance vision.',
      ctaWatch: 'Watch Latest Episode',
      ctaApply: 'Apply to be President',
      liveNow: 'LIVE AIRING NOW',
      nextLive: 'Next Live Airing',
      trustMins: '30 Mins Uncut Broadcast',
      trustDecrees: 'Executive Decrees Documented',
      trustGlobal: 'Airing on ifiruled.world'
    },
    countdown: {
      days: 'Days',
      hours: 'Hours',
      minutes: 'Mins',
      seconds: 'Secs',
      remindMe: 'Set Airing Reminder',
      reminderSet: 'Reminder Added!',
      everyThursday: 'Every Thursday • 8:00 PM BST',
      liveNotice: 'Live broadcast is currently on air! Watch below.'
    },
    featured: {
      tag: 'Featured Broadcast',
      title: 'Latest Presidential Address',
      subtitle: 'Watch the latest 30-minute unscripted governance session in high definition.',
      decreesHeading: 'Executive Decrees Passed:',
      readBlueprint: 'Read Full Policy Blueprint',
      exploreAll: 'Explore All Broadcasts',
      views: 'Views'
    },
    howItWorks: {
      tag: 'The Presidential Journey',
      title: 'How It Works',
      subtitle: 'From an ambitious thought to commanding the nation’s attention in 4 clear steps.',
      step1Title: '1. Apply & Pitch',
      step1Desc: 'Submit your bold policy idea and your signature first executive order.',
      step2Title: '2. Cabinet Selection',
      step2Desc: 'Our board reviews proposals for originality, feasibility, and visionary leadership.',
      step3Title: '3. 30 Mins in Power',
      step3Desc: 'Take the hot presidential seat live in front of tens of thousands of viewers.',
      step4Title: '4. National Impact',
      step4Desc: 'Your manifesto is documented on the Ideas Hub for policymakers and citizens.'
    },
    stats: {
      episodes: 'Episodes Aired',
      viewers: 'Live Viewers Reached',
      countries: 'Countries Reached',
      ideas: 'Manifesto Ideas'
    },
    guestCarousel: {
      tag: 'Alumni Cabinet',
      title: 'Past Presidents in the Chair',
      subtitle: 'Meet the visionary young minds who have stepped up to rule the country and declare their 30-minute blueprints.',
      presidentTag: 'President',
      viewDecrees: 'View Decrees & Address'
    },
    manifestoSection: {
      tag: 'Crowdsourced Governance',
      title: 'The People’s Manifesto Wall',
      subtitle: 'What would you do if you were President? Submit your proposal, and vote for the best citizen ideas.',
      exploreAll: 'Explore All Policy Ideas & Submit Yours',
      endorsements: 'Endorsements',
      endorse: 'Endorse Idea'
    },
    ctaBanner: {
      heading: 'Ready for Your 30 Minutes in the Presidential Chair?',
      paragraph: 'We are actively scouting bold young thinkers (aged 18–30) across economics, defense, AI, climate, and public health. Step forward and claim your voice.',
      applyBtn: 'Apply to Be President',
      learnBtn: 'Learn About the Show'
    },
    newsletter: {
      tag: 'Join the Cabinet',
      title: 'Get the Best Youth Governance Ideas Every Week',
      subtitle: 'Subscribe for episode highlights, policy breakdowns, and exclusive guest debriefs.',
      placeholder: 'Enter your email address...',
      button: 'Join Cabinet',
      success: 'Welcome to the Cabinet! Check your inbox for confirmation.'
    },
    footer: {
      tagline: '30 minutes in power. A lifetime of ideas.',
      bio: 'An unscripted, live, and youth-led presidential roleplay media show. Giving the next generation sovereign authority to build the future.',
      navHeading: 'Show Navigation',
      homeLink: 'Home Broadcast',
      episodesLink: 'All Episodes & Archive',
      manifestoLink: 'Crowdsourced Ideas Hub',
      guestsLink: 'Cabinet of Past Presidents',
      applyLink: 'Apply to be President',
      orgHeading: 'Organization',
      aboutLink: 'About the Show & Mission',
      partnersLink: 'Sponsors & Brand Partners',
      pressKitLink: 'Download Press Kit',
      mediaLink: 'Media & Press Inquiries',
      feedbackLink: 'Audience Feedback',
      legalHeading: 'Governance & Legal',
      privacyLink: 'Privacy Policy',
      termsLink: 'Terms of Broadcast',
      guidelinesLink: 'Content & Community Guidelines',
      adminLink: 'Executive Desk (Admin)',
      broadcastSchedule: 'Broadcasts: Thursdays 8PM BST',
      copyright: 'All rights reserved. Designed with sovereign craftsmanship.',
      officialDomain: 'Official Domain'
    },
    episodesPage: {
      tag: 'Broadcast Archive',
      title: 'The Presidential Library',
      subtitle: 'Explore every 30-minute unscripted address, policy reform, and passed executive decree.',
      searchPlaceholder: 'Search by president, title, or sector...',
      allTopics: 'All Topics',
      noEpisodes: 'No Episodes Found',
      noEpisodesDesc: 'We couldn\'t find any broadcasts matching your criteria. Try searching a different keyword or topic.',
      resetFilters: 'Reset All Filters'
    },
    manifestoPage: {
      tag: 'Crowdsourced Governance',
      title: 'The People’s Manifesto Hub',
      subtitle: 'Every citizen has a blueprint for a better nation. Explore bold reforms submitted by the public, vote to elevate the most urgent ideas, and post your own policy decree.',
      submitBtn: 'Submit Policy Proposal',
      allTopics: 'All',
      endorsements: 'Endorsements',
      endorseBtn: 'Endorse',
      modalTitle: 'Submit Your Policy Proposal',
      modalSubtitle: 'Share your 1-liner vision or executive decree for the country.',
      authorName: 'Your Full Name *',
      authorRole: 'Your Profession / Background *',
      location: 'City & Country *',
      topic: 'Governance Sector *',
      proposalTitle: 'Core Proposal Headline (1-Liner) *',
      proposalDetails: 'Proposal Details & Impact *',
      submitProposal: 'Submit to Manifesto Hub',
      cancelBtn: 'Cancel'
    },
    guestsPage: {
      tag: 'The Youth Cabinet',
      title: 'Past Presidents Archive',
      subtitle: 'Every leader who has occupied the presidential seat, defended their decrees, and presented a vision for national transformation.',
      presidentTag: 'President of',
      viewFullAddress: 'View Full Address & Blueprint'
    },
    aboutPage: {
      tag: 'Behind the Broadcast',
      title: 'Giving the Next Generation 30 Minutes of Sovereign Authority',
      subtitle: 'Why we built an unscripted, youth-led presidential media platform in a world that needs bold, new governance ideas.',
      missionTitle: 'Our Mission',
      formatTitle: 'The 30-Minute Format',
      applyCta: 'Apply for the Presidential Chair'
    },
    partnersPage: {
      tag: 'Strategic Alliances',
      title: 'Partner with the Foremost Youth Governance Platform',
      subtitle: 'Align your organization with visionary youth leadership, unscripted discourse, and nationwide civic engagement.',
      becomePartner: 'Become a Partner'
    },
    contactPage: {
      tag: 'Official Dispatch',
      title: 'Contact the Executive Desk',
      subtitle: 'Media requests, institutional partnerships, sponsorship inquiries, and public correspondence.',
      fullName: 'Full Name *',
      email: 'Email Address *',
      inquiryType: 'Inquiry Category *',
      message: 'Message Details *',
      sendBtn: 'Transmit Message',
      sendingBtn: 'Transmitting Message...',
      successMsg: 'Your dispatch has been securely transmitted. A producer will reply within 24 business hours.'
    },
    applyPage: {
      tag: 'Presidential Candidacy 2026',
      title: 'Claim Your 30 Minutes in Power',
      subtitle: 'Are you ready to sit in the presidential seat and deliver your unscripted reform blueprint to the nation? Applications open for youth aged 18–30.',
      step1Label: '1. Identity & Profile',
      step2Label: '2. Executive Decrees',
      step3Label: '3. Video Pitch & Review',
      fullName: 'Full Name *',
      age: 'Age (18–30) *',
      email: 'Email Address *',
      phone: 'Phone / WhatsApp *',
      city: 'City / Region *',
      profession: 'Current Occupation / Student Status *',
      sector: 'Presidential Focus Sector *',
      decreeTitle: 'Title of Your First Executive Order *',
      manifesto: 'Your 30-Minute Governance Manifesto *',
      videoUrl: '1-Minute Elevator Video Pitch (YouTube/Drive URL)',
      linkedin: 'LinkedIn Profile URL',
      social: 'Social Handle (@handle)',
      consent: 'I certify that I am between 18 and 30 years old, ready to participate live, and commit to non-partisan policy discourse.',
      nextStep: 'Next Step →',
      backStep: '← Back',
      submitBtn: 'Submit Presidential Candidacy',
      submittingBtn: 'Transmitting Application...',
      successTitle: 'Application Received',
      successDesc: 'Your policy brief has been logged with the If I Ruled Executive Selection Panel. We will contact you via email and phone if selected for preliminary interview.',
      exploreEpisodes: 'Explore Current Episodes'
    }
  },
  bn: {
    nav: {
      home: 'মূলপাতা',
      episodes: 'সকল পর্ব',
      manifesto: 'আইডিয়া ও সংস্কার হাব',
      guests: 'রাষ্ট্রপতি গ্যালারি',
      about: 'আমাদের কথা',
      partners: 'অংশীদারিত্ব',
      contact: 'যোগাযোগ',
      apply: 'রাষ্ট্রপতি পদে আবেদন'
    },
    hero: {
      badge: 'স্ক্রিপ্টহীন • সরাসরি সম্প্রচার • তরুণদের শাসনভাবনা',
      titleLine1: '৩০ মিনিটের রাষ্ট্রক্ষমতা।',
      titleLine2: 'এক জীবনের দূরদর্শী ভাবনা।',
      subtitle: 'যদি দেশের সর্বোচ্চ ক্ষমতা আপনার হাতে থাকত, আপনি কী করতেন? দেশের নির্ভীক তরুণদের হাতে ৩০ মিনিটের রাষ্ট্রক্ষমতা তুলে দিয়ে আমরা সরাসরি শুনছি রাষ্ট্র সংস্কার ও দেশ গড়ার বাস্তব রূপরেখা।',
      ctaWatch: 'সর্বশেষ পর্বটি দেখুন',
      ctaApply: '৩০ মিনিটের রাষ্ট্রপতি হতে আবেদন করুন',
      liveNow: 'সরাসরি সম্প্রচার চলছে',
      nextLive: 'পরবর্তী সরাসরি সম্প্রচার',
      trustMins: '৩০ মিনিটের উন্মুক্ত সম্প্রচার',
      trustDecrees: 'নথিভুক্ত সংস্কার আদেশ',
      trustGlobal: 'সম্প্রচারিত হচ্ছে ifiruled.world-এ'
    },
    countdown: {
      days: 'দিন',
      hours: 'ঘণ্টা',
      minutes: 'মিনিট',
      seconds: 'সেকেন্ড',
      remindMe: 'রিমাইন্ডার সেট করুন',
      reminderSet: 'রিমাইন্ডার যুক্ত হয়েছে!',
      everyThursday: 'প্রতি বৃহস্পতিবার • রাত ৮:০০ টা (বাংলাদেশ সময়)',
      liveNotice: 'বর্তমানে সরাসরি সম্প্রচার চলছে! নিচে সরাসরি উপভোগ করুন।'
    },
    featured: {
      tag: 'বিশেষ সম্প্রচার',
      title: 'সর্বশেষ রাষ্ট্রপতির ভাষণ',
      subtitle: 'উচ্চমানের ভিডিওতে সরাসরি উপভোগ করুন ৩০ মিনিটের অনন্য রাষ্ট্র পরিচালনা সেশন।',
      decreesHeading: 'ঘোষিত প্রধান নির্বাহী সংস্কারসমূহ:',
      readBlueprint: 'সম্পূর্ণ পলিসি ব্লুপ্রিন্ট পড়ুন',
      exploreAll: 'পূর্ববর্তী সকল পর্ব দেখুন',
      views: 'বার দেখা হয়েছে'
    },
    howItWorks: {
      tag: 'রাষ্ট্রনায়ক হওয়ার প্রক্রিয়া',
      title: 'কীভাবে অংশ নেবেন',
      subtitle: 'একটি সাহসী চিন্তা থেকে পুরো জাতির সামনে ৩০ মিনিটের রাষ্ট্রনায়ক হয়ে ওঠার ৪টি সহজ ধাপ।',
      step1Title: '১. আবেদন ও পরিকল্পনা জমা',
      step1Desc: 'আপনার প্রথম নির্বাহী আদেশ ও প্রধান সংস্কার পরিকল্পনা আমাদের কাছে পাঠান।',
      step2Title: '২. কেবিনেট মূল্যায়ন',
      step2Desc: 'আমাদের বিশেষজ্ঞ প্যানেল আপনার ধারণার মৌলিকতা, দূরদর্শিতা ও প্রায়োগিক সম্ভাবনা যাচাই করে।',
      step3Title: '৩. ৩০ মিনিটের ক্ষমতা',
      step3Desc: 'হাজারো দর্শকের সামনে সরাসরি লাইভে রাষ্ট্রপতির আসনে বসে ঘোষণা করুন দেশ গড়ার পরিকল্পনা।',
      step4Title: '৪. জাতীয় নীতিনির্ধারণে প্রভাব',
      step4Desc: 'আপনার উপস্থাপিত সংস্কার প্রস্তাব যুক্ত হবে জাতীয় আইডিয়া হাবে।'
    },
    stats: {
      episodes: 'সম্প্রচারিত পর্ব',
      viewers: 'মোট দর্শক সমাগম',
      countries: 'দেশ ও অঞ্চল জুড়ে বিস্তার',
      ideas: 'গৃহীত নাগরিক সংস্কার প্রস্তাব'
    },
    guestCarousel: {
      tag: 'সাবেক রাষ্ট্রপতিবৃন্দ',
      title: 'চেয়ারে আসীন তরুণ নেতৃত্ব',
      subtitle: 'পরিচিত হোন সেই দূরদর্শী তরুণদের সাথে, যারা ৩০ মিনিটের জন্য দেশের হাল ধরেছিলেন এবং দিয়েছেন জাতীয় রূপান্তরের প্রতিশ্রুতি।',
      presidentTag: 'রাষ্ট্রপতি',
      viewDecrees: 'ঘোষিত আদেশ ও ভাষণ দেখুন'
    },
    manifestoSection: {
      tag: 'নাগরিক রাষ্ট্রচিন্তা',
      title: 'জনগণের মেনিফেস্টো দেয়াল',
      subtitle: 'আপনি রাষ্ট্রপতি হলে দেশের জন্য কী করতেন? আপনার প্রস্তাবনা জমা দিন এবং সেরা নাগরিক সংস্কার ভাবনায় ভোট দিন।',
      exploreAll: 'সকল সংস্কার ভাবনা দেখুন ও নিজের প্রস্তাব জমা দিন',
      endorsements: 'নাগরিক সমর্থন',
      endorse: 'সমর্থন দিন'
    },
    ctaBanner: {
      heading: 'আপনি কি প্রস্তুত ৩০ মিনিটের জন্য রাষ্ট্রপতির চেয়ারে বসতে?',
      paragraph: 'অর্থনীতি, শিক্ষা, প্রযুক্তি, জলবায়ু, প্রতিরক্ষা ও জনস্বার্থ সংস্কারে ১৮ থেকে ৩০ বছর বয়সী সাহসী চিন্তাশীল তরুণদের আমরা খুঁজছি। এগিয়ে আসুন আপনার দূরদর্শী রূপরেখা তুলে ধরতে।',
      applyBtn: 'রাষ্ট্রপতি হতে আবেদন করুন',
      learnBtn: 'আমাদের শো সম্পর্কে বিস্তারিত জানুন'
    },
    newsletter: {
      tag: 'কেবিনেট ডাইজেস্ট',
      title: 'তারুণ্যের সেরা রাষ্ট্রচিন্তা পান প্রতি সপ্তাহে',
      subtitle: 'প্রতিটি পর্বের হাইলাইটস, পলিসি বিশ্লেষণ এবং বিশেষজ্ঞদের মতামত সরাসরি আপনার ইমেইলে।',
      placeholder: 'আপনার ইমেইল ঠিকানা দিন...',
      button: 'যুক্ত থাকুন',
      success: 'ধন্যবাদ! আপনি সফলভাবে কেবিনেট ডাইজেস্টে যুক্ত হয়েছেন।'
    },
    footer: {
      tagline: '৩০ মিনিটের রাষ্ট্রক্ষমতা। এক জীবনের দূরদর্শী ভাবনা।',
      bio: 'একটি স্ক্রিপ্টহীন, সরাসরি সম্প্রচারিত এবং তরুণদের নেতৃত্বাধীন রাষ্ট্রচিন্তার মিডিয়া প্ল্যাটফর্ম। আগামীর নেতৃত্বকে আজই রাষ্ট্র পরিচালনার মঞ্চে তুলে ধরাই আমাদের লক্ষ্য।',
      navHeading: 'প্রয়োজনীয় লিংক',
      homeLink: 'মূল সম্প্রচার',
      episodesLink: 'সকল পর্ব ও আর্কাইভ',
      manifestoLink: 'নাগরিক আইডিয়া হাব',
      guestsLink: 'সাবেক রাষ্ট্রপতিদের গ্যালারি',
      applyLink: 'রাষ্ট্রপতি হতে আবেদন',
      orgHeading: 'প্রতিষ্ঠান',
      aboutLink: 'আমাদের লক্ষ্য ও পরিচিতি',
      partnersLink: 'পৃষ্ঠপোষক ও অংশীদারিত্ব',
      pressKitLink: 'অফিসিয়াল প্রেস কিট',
      mediaLink: 'মিডিয়া ও প্রেস যোগাযোগ',
      feedbackLink: 'দর্শক মতামত ও ফিডব্যাক',
      legalHeading: 'আইন ও সম্প্রচার নীতি',
      privacyLink: 'গোপনীয়তা নীতিমালা',
      termsLink: 'সম্প্রচার শর্তাবলী',
      guidelinesLink: 'কন্টেন্ট ও কমিউনিটি গাইডলাইন',
      adminLink: 'এক্সিকিউটিভ কন্ট্রোল ডেস্ক',
      broadcastSchedule: 'সরাসরি সম্প্রচার: প্রতি বৃহস্পতিবার রাত ৮:০০ টা',
      copyright: 'সর্বস্বত্ব সংরক্ষিত। দেশ গড়ার দূরদর্শী অঙ্গীকার নিয়ে নির্মিত।',
      officialDomain: 'অফিসিয়াল ডোমেইন'
    },
    episodesPage: {
      tag: 'সম্প্রচার আর্কাইভ',
      title: 'প্রেসিডেন্সিয়াল লাইব্রেরি',
      subtitle: '৩০ মিনিটের প্রতিটি স্ক্রিপ্টহীন ভাষণ, খাতভিত্তিক সংস্কার এবং ঘোষিত নির্বাহী আদেশসমূহ অনুসন্ধান করুন ও সরাসরি দেখুন।',
      searchPlaceholder: 'রাষ্ট্রপতির নাম, আদেশ বা সংস্কারের বিষয় দিয়ে খুঁজুন...',
      allTopics: 'সকল খাত',
      noEpisodes: 'কোনো পর্ব খুঁজে পাওয়া যায়নি',
      noEpisodesDesc: 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পর্ব পাওয়া যায়নি। অনুগ্রহ করে অন্য কোনো শব্দ বা বিষয় দিয়ে অনুসন্ধান করুন।',
      resetFilters: 'ফিল্টার রিসেট করুন'
    },
    manifestoPage: {
      tag: 'জনগণের সংস্কার ভাবনা',
      title: 'সিটিজেন মেনিফেস্টো হাব',
      subtitle: 'প্রতিটি সচেতন নাগরিকের কাছেই দেশকে এগিয়ে নেওয়ার একটি পরিকল্পনা থাকে। দেশের মানুষের জমা দেওয়া সংস্কার প্রস্তাবগুলো পড়ুন, সেরা নীতিতে সমর্থন জানান এবং আপনার নিজস্ব নির্বাহী আদেশ প্রকাশ করুন।',
      submitBtn: 'সংস্কার প্রস্তাব জমা দিন',
      allTopics: 'সকল',
      endorsements: 'নাগরিক সমর্থন',
      endorseBtn: 'সমর্থন দিন',
      modalTitle: 'আপনার নীতি সংস্কার প্রস্তাব জমা দিন',
      modalSubtitle: 'দেশের জন্য আপনার এক লাইনের রূপরেখা বা প্রধান নির্বাহী আদেশটি তুলে ধরুন।',
      authorName: 'আপনার পূর্ণ নাম *',
      authorRole: 'পেশা / বর্তমান ভূমিকা *',
      location: 'শহর ও জেলা *',
      topic: 'সংস্কারের খাত *',
      proposalTitle: 'মূল সংস্কারের শিরোনাম (এক লাইনে) *',
      proposalDetails: 'প্রস্তাবনার বিস্তারিত ও জাতীয় সুফল *',
      submitProposal: 'মেনিফেস্টো হাবে প্রকাশ করুন',
      cancelBtn: 'বাতিল'
    },
    guestsPage: {
      tag: 'তারুণ্যের কেবিনেট',
      title: 'সাবেক রাষ্ট্রপতিদের আর্কাইভ',
      subtitle: 'যেসব তরুণ রাষ্ট্রনায়ক হট-সিটে বসেছেন, নিজের নীতি রক্ষা করেছেন এবং জাতীয় রূপান্তরের সাহসী ব্লুপ্রিন্ট উপস্থাপন করেছেন।',
      presidentTag: 'রাষ্ট্রপতি,',
      viewFullAddress: 'সম্পূর্ণ ভাষণ ও সংস্কার রূপরেখা দেখুন'
    },
    aboutPage: {
      tag: 'পর্দার পেছনের কথা',
      title: 'নতুন প্রজন্মের হাতে ৩০ মিনিটের সর্বোচ্চ রাষ্ট্রক্ষমতা',
      subtitle: 'কেন আমরা তৈরি করেছি একটি স্ক্রিপ্টহীন, তরুণ নেতৃত্বাধীন প্রেসিডেন্সিয়াল মিডিয়া প্ল্যাটফর্ম—যা জাতীয় উন্নয়নে দেবে নতুন চিন্তা ও নেতৃত্ব।',
      missionTitle: 'আমাদের মূল লক্ষ্য',
      formatTitle: '৩০ মিনিটের রূপরেখা ফরম্যাট',
      applyCta: 'রাষ্ট্রপতির আসনের জন্য আবেদন করুন'
    },
    partnersPage: {
      tag: 'কৌশলগত অংশীদারিত্ব',
      title: 'তারুণ্যের সর্ববৃহৎ রাষ্ট্রচিন্তা উদ্যোগের অংশীদার হোন',
      subtitle: 'আপনার প্রতিষ্ঠানকে যুক্ত করুন আগামী দিনের দূরদর্শী নেতৃত্ব, গঠনমূলক উন্মুক্ত আলোচনা এবং দেশব্যাপী ইতিবাচক রূপান্তরের সাথে।',
      becomePartner: 'অংশীদার হতে যোগাযোগ করুন'
    },
    contactPage: {
      tag: 'অফিসিয়াল যোগাযোগ',
      title: 'এক্সিকিউটিভ ডেস্কে বার্তা পাঠান',
      subtitle: 'মিডিয়া কাভারেজ, প্রাতিষ্ঠানিক অংশীদারিত্ব, স্পনসরশিপ বা যেকোনো সাধারণ অনুসন্ধানে আমাদের প্রযোজনা দলের সাথে সরাসরি যোগাযোগ করুন।',
      fullName: 'আপনার পূর্ণ নাম *',
      email: 'ইমেইল ঠিকানা *',
      inquiryType: 'যোগাযোগের বিষয় *',
      message: 'বার্তার বিবরণ *',
      sendBtn: 'বার্তা প্রেরণ করুন',
      sendingBtn: 'বার্তা পাঠানো হচ্ছে...',
      successMsg: 'আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে। আমাদের প্রযোজনা দল ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবে।'
    },
    applyPage: {
      tag: 'প্রেসিডেন্সিয়াল প্রার্থিতা ২০২৬',
      title: 'দাবি করুন আপনার ৩০ মিনিটের রাষ্ট্রক্ষমতা',
      subtitle: 'আপনি কি প্রস্তুত রাষ্ট্রপতির আসনে বসে জাতির সামনে আপনার দেশ গড়ার পরিকল্পনা তুলে ধরতে? ১৮ থেকে ৩০ বছর বয়সী উদ্যমী তরুণদের জন্য আবেদন উন্মুক্ত।',
      step1Label: '১. পরিচয় ও ব্যক্তিগত তথ্য',
      step2Label: '২. নির্বাহী আদেশ ও সংস্কার',
      step3Label: '৩. ভিডিও পিচ ও পর্যালোচনা',
      fullName: 'পূর্ণ নাম *',
      age: 'বয়স (১৮–৩০ বছর) *',
      email: 'ইমেইল ঠিকানা *',
      phone: 'মোবাইল / হোয়াটসঅ্যাপ নম্বর *',
      city: 'বর্তমান শহর ও জেলা *',
      profession: 'পেশা / পড়াশোনার বিষয় *',
      sector: 'সংস্কারের মূল খাত *',
      decreeTitle: 'আপনার প্রথম নির্বাহী আদেশের শিরোনাম *',
      manifesto: '৩০ মিনিটের রাষ্ট্র পরিচালনা মেনিফেস্টো *',
      videoUrl: '১ মিনিটের ভিডিও পিচ লিংক (YouTube / Drive লিংক)',
      linkedin: 'লিঙ্কডইন প্রোফাইল লিংক',
      social: 'সোশ্যাল মিডিয়া হ্যান্ডেল (@handle)',
      consent: 'আমি নিশ্চিত করছি যে আমার বয়স ১৮ থেকে ৩০ বছরের মধ্যে, আমি সরাসরি বা ভার্চুয়ালি লাইভ অনুষ্ঠানে অংশ নিতে প্রস্তুত এবং গঠনমূলক দেশ গড়ার আলোচনায় প্রতিশ্রুতিবদ্ধ।',
      nextStep: 'পরবর্তী ধাপ →',
      backStep: '← পূর্ববর্তী ধাপ',
      submitBtn: 'প্রার্থিতার আবেদন জমা দিন',
      submittingBtn: 'আবেদনপত্র পাঠানো হচ্ছে...',
      successTitle: 'আবেদন সফলভাবে গৃহীত হয়েছে',
      successDesc: 'আপনার প্রস্তাবনাটি সিলেকশন বোর্ডের নথিতে সংরক্ষিত হয়েছে। প্রাথমিক সাক্ষাৎকারের জন্য নির্বাচিত হলে ইমেইল ও ফোনে আপনার সাথে যোগাযোগ করা হবে।',
      exploreEpisodes: 'অন্যান্য পর্বগুলো দেখুন'
    }
  }
}

export function useLanguage() {
  const currentLang = useCookie<Language>('ifiruled_lang', {
    default: () => 'en',
    maxAge: 60 * 60 * 24 * 365,
    path: '/'
  })

  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'en' ? 'bn' : 'en'
  }

  const setLanguage = (lang: Language) => {
    currentLang.value = lang
  }

  const t = computed(() => translations[currentLang.value])

  return {
    currentLang,
    toggleLanguage,
    setLanguage,
    t
  }
}

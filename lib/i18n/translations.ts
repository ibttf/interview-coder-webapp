// Translation keys for the application
// Organized by section for easier management

export type Language = "en" | "hi"

export const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      pricing: "Pricing",
      help: "Help",
      login: "Login",
      signup: "Sign Up",
      dashboard: "Dashboard",
      settings: "Settings",
      logout: "Log out",
      signingOut: "Signing out..."
    },

    // Hero Section
    hero: {
      tagline: "F*ck Leetcode.",
      subtitle:
        "Interview Coder is an invisible AI to solve any coding problem.",
      downloadMac: "Download for Mac",
      downloadWindows: "Download for Windows",
      macSilicon: "Download for Mac (Apple Silicon)",
      macIntel: "Download for Mac (Intel)"
    },

    // Company Section
    company: {
      title: "Works on Everything",
      subtitle: "Invisible to all screen-recording softwares.",
      disclaimer:
        "* Undetectability may not work with some versions of MacOS. THIS IS NOT REFUNDABLE. See our notice for more details."
    },

    // Steps Section
    steps: {
      howToUse: "How to Use",
      howToUseSubtitle:
        "For an in-depth tutorial on setting it up, visit our help center",
      step1: {
        subtitle: "Get Started",
        title: "Subscribe to Interview Coder",
        description:
          "Make an account and subscribe to Interview Coder. Get instant access to our AI-powered interview solution generator."
      },
      step2: {
        subtitle: "Capture the Problem",
        title: "Start taking screenshots",
        description:
          "Use ⌘ + H to capture the problem. Up to 2 screenshots will be saved and shown on the application."
      },
      step3: {
        subtitle: "Solve",
        title: "Get your solutions",
        description:
          "Once you've captured your screenshots, press ⌘ + ↵ to generate solutions. We'll analyze the problem and provide a solution with detailed explanations."
      },
      step4: {
        subtitle: "Debug and Optimize",
        title: "Debug your solutions",
        description:
          "If the solutions are incorrect or you need an optimization, take extra screenshots of your code with ⌘ + H. Press ⌘ + ↵ again and we'll debug and optimize your code, with before and after comparisons."
      },
      subscribeToday: "Subscribe Today ($60/month)",
      welcomeTo: "Welcome to Interview Coder",
      continueUsing:
        "To continue using Interview Coder, you'll need to subscribe ($60/month)",
      toggleVisibility: "Toggle Visibility",
      quitApp: "Quit App",
      subscribe: "Subscribe",
      logOut: "Log Out",
      backgroundScreenshot: "Background screenshot",
      takeFirstScreenshot: "Take first screenshot",
      thoughts: "Thoughts (Read these aloud)",
      thoughtsContent:
        "We need to find two numbers that sum to the target value.\nWe can use a hash map to store numbers we've seen.\nFor each number, check if its complement exists in the map.",
      solution: "Solution",
      complexity: "Complexity",
      timeComplexity: "Time Complexity: O(n)",
      spaceComplexity: "Space Complexity: O(n)",
      whatIChanged: "What I Changed (Read these aloud)",
      changesContent:
        "The current solution uses nested loops, resulting in O(n²) time complexity.\nWe can optimize this by using a hash map to store previously seen numbers.\nThis reduces time complexity to O(n) with O(n) space trade-off."
    },

    // FAQ Section
    faq: {
      title: "Common Questions",
      subtitle: "Everything you need to know about Interview Coder.",
      questions: {
        q1: {
          question: "Is Interview Coder free?",
          answer:
            "No, it's $60 a month. In exchange, you get access to the absolute latest models, including o3-mini-high."
        },
        q2: {
          question: "How is it undetectable?",
          answer:
            "Our software is designed to be completely undetectable to interviewers."
        },
        q3: {
          question: "Is it suitable for all skill levels?",
          answer: "Yes."
        },
        q4: {
          question: "What programming languages are supported?",
          answer:
            "Python, Golang, R, SQL, Ruby, Java, Javascript, C++, Kotlin, and Swift. You can edit your preferred langauge in the app or in your settings."
        },
        q5: {
          question: "I'm experiencing a bug, what should I do",
          answer:
            "9 times out of 10, you can uninstall and reinstall the app from this website. If that doesn't work, please email us and we'll get back to you within 24 hours."
        }
      },
      helpCenterPrefix: "Have more questions? Visit our",
      helpCenterLink: "help center",
      helpCenterSuffix: "for detailed guides and support."
    },

    // CTA Section
    cta: {
      title: "Take the short way.",
      subtitle: "Download and use Interview Coder today."
    },

    // Language Toggle
    language: {
      en: "English",
      hi: "हिंदी"
    },

    // Commands Section
    commands: {
      title: "Commands we love",
      subtitle:
        "These commands are designed to be natural and easy to remember.",
      hideShow: "Hide/show the Interview Coder window instantly.",
      captureScreenshot:
        "Problem Mode: Capture screenshots of the interview question and requirements. Solution Mode: Take screenshots of your code to get optimization suggestions.",
      generateSolution:
        "Problem Mode: Generate an initial solution with detailed explanations based on the problem screenshots. Solution Mode: Debug and optimize your existing solution based on your code screenshots.",
      moveWindow:
        "Move the window around your screen without touching the mouse.",
      reset: "Reset everything to start fresh with a new problem.",
      quit: "Quit the application to remove the functionality of all keyboard commands."
    },

    // Footer
    footer: {
      allRightsReserved: "© 2025 Interview Coder. All rights reserved.",
      support: "Support",
      contact: "Contact Us",
      refundPolicy: "Refund Policy",
      cancellationPolicy: "Cancellation Policy",
      termsOfService: "Terms of Service",
      download: "Download",
      description:
        "Interview Coder is an undetectable desktop application to help you pass your Leetcode interviews.",
      allSystemsOnline: "All systems online"
    },

    // Undetectability Section
    undetectability: {
      title: "How is it undetectable?",
      subtitle:
        "Interview Coder has the most robust undetectability features on the planet.",
      screenSharing: "Screen Sharing Detection",
      screenSharingDesc:
        "Our app is completely invisible to screen sharing software and screenshots on platforms like Zoom, Google Meet, Hackerrank, and Coderpad.",
      solutionReasoning: "Solution Reasoning",
      solutionReasoningDesc:
        "Every line of code comes with detailed comments and natural thought process explanations, helping you articulate your solution approach convincingly.",
      webcamMonitoring: "Webcam Monitoring",
      webcamMonitoringDesc:
        "Use ⌘ + arrow keys to move the app over your coding area, keeping your eyes naturally focused on the screen during webcam monitoring.",
      activeTabDetection: "Active Tab Detection",
      activeTabDetectionDesc:
        "Toggle visibility with ⌘ + B while maintaining cursor focus and active tab state, making it undetectable by platform monitoring."
    },

    // Misc
    misc: {
      easyWorker: "Now in Hindi!",
      affiliate: "Affiliate",
      proof: "Proof",
      watchMe:
        "Watch me get an offer from Amazon using Interview Coder. Throughout this whole video, you'll see me use Interview Coder for both the OA and the final round.",
      skeptical: "Skeptical? Watch the entire, uncut technical interview",
      pro: "PRO"
    },

    // Subscribe Page
    subscribe: {
      welcome: "Welcome to Interview Coder",
      needToSubscribe:
        "To continue using Interview Coder, you'll need to subscribe ($60/month)",
      toggleVisibility: "Toggle Visibility",
      quitApp: "Quit App",
      subscribeButton: "Subscribe",
      logOut: "Log Out"
    },

    // Queue Component
    queue: {
      screenshot: "Screenshot",
      solve: "Solve"
    },

    // QueueCommands Component
    queueCommands: {
      keyboardShortcuts: "Keyboard Shortcuts",
      toggleWindow: "Toggle Window",
      toggleWindowDesc: "Show or hide this window.",
      takeScreenshot: "Take Screenshot",
      takeScreenshotDesc:
        "Take a screenshot of the problem description. The tool will extract and analyze the problem. The 5 latest screenshots are saved.",
      solveProblem: "Solve Problem",
      solveProblemDesc: "Generate a solution based on the current problem."
    },

    // Auth Components
    auth: {
      loginToInterviewCoder: "Log in to Interview Coder",
      createAccount: "Create your account",
      orContinueWithEmail: "Or continue with email",
      emailAddress: "Email address",
      password: "Password",
      signIn: "Sign in",
      signingIn: "Signing in...",
      createAccountBtn: "Create account",
      creatingAccount: "Creating account...",
      dontHaveAccount: "Don't have an account? Sign up →",
      alreadyHaveAccount: "Already have an account? Sign in →",
      errorSigningIn: "Something went wrong, try again later",
      errorSigningUp: "Something went wrong, try again later",
      passwordMinLength: "Password must be at least 6 characters"
    }
  },

  hi: {
    // Navbar
    nav: {
      home: "होम",
      pricing: "मूल्य निर्धारण",
      help: "सहायता",
      login: "लॉगिन",
      signup: "साइन अप",
      dashboard: "डैशबोर्ड",
      settings: "सेटिंग्स",
      logout: "लॉग आउट",
      signingOut: "लॉग आउट हो रहा है..."
    },

    // Hero Section
    hero: {
      tagline: "लीटकोड को भूल जाओ।",
      subtitle:
        "Interview Coder एक अदृश्य AI है जो किसी भी कोडिंग समस्या को हल करता है।",
      downloadMac: "मैक के लिए डाउनलोड करें",
      downloadWindows: "विंडोज के लिए डाउनलोड करें",
      macSilicon: "मैक के लिए डाउनलोड करें (एप्पल सिलिकॉन)",
      macIntel: "मैक के लिए डाउनलोड करें (इंटेल)"
    },

    // Company Section
    company: {
      title: "सब कुछ पर काम करता है",
      subtitle: "सभी स्क्रीन-रिकॉर्डिंग सॉफ्टवेयर के लिए अदृश्य।",
      disclaimer:
        "* अदृश्यता कुछ MacOS संस्करणों के साथ काम नहीं कर सकती है। यह वापसी योग्य नहीं है। अधिक जानकारी के लिए हमारी सूचना देखें।"
    },

    // Steps Section
    steps: {
      howToUse: "Interview Coder का उपयोग कैसे करें",
      howToUseSubtitle:
        "इसे सेट करने के लिए विस्तृत ट्यूटोरियल के लिए, हमारे सहायता केंद्र पर जाएं",
      step1: {
        subtitle: "शुरू करें",
        title: "Interview Coder की सदस्यता लें",
        description:
          "एक खाता बनाएं और Interview Coder की सदस्यता लें। हमारे AI-संचालित इंटरव्यू समाधान जनरेटर तक तुरंत पहुंच प्राप्त करें।"
      },
      step2: {
        subtitle: "समस्या को कैप्चर करें",
        title: "स्क्रीनशॉट लेना शुरू करें",
        description:
          "समस्या को कैप्चर करने के लिए ⌘ + H का उपयोग करें। 2 स्क्रीनशॉट तक सहेजे जाएंगे और एप्लिकेशन पर दिखाए जाएंगे।"
      },
      step3: {
        subtitle: "हल करें",
        title: "अपने समाधान प्राप्त करें",
        description:
          "अपने स्क्रीनशॉट कैप्चर करने के बाद, समाधान उत्पन्न करने के लिए ⌘ + ↵ दबाएं। हम समस्या का विश्लेषण करेंगे और विस्तृत स्पष्टीकरण के साथ एक समाधान प्रदान करेंगे।"
      },
      step4: {
        subtitle: "डीबग और अनुकूलित करें",
        title: "अपने समाधानों को डीबग करें",
        description:
          "यदि समाधान गलत हैं या आपको अनुकूलन की आवश्यकता है, तो ⌘ + H के साथ अपने कोड के अतिरिक्त स्क्रीनशॉट लें। फिर से ⌘ + ↵ दबाएं और हम आपके कोड को डीबग और अनुकूलित करेंगे, पहले और बाद के तुलना के साथ।"
      },
      subscribeToday: "आज ही सदस्यता लें ($60/माह)",
      welcomeTo: "Interview Coder में आपका स्वागत है",
      continueUsing:
        "Interview Coder का उपयोग जारी रखने के लिए, आपको सदस्यता लेनी होगी ($60/माह)",
      toggleVisibility: "दृश्यता टॉगल करें",
      quitApp: "ऐप से बाहर निकलें",
      subscribe: "सदस्यता लें",
      logOut: "लॉग आउट",
      backgroundScreenshot: "पृष्ठभूमि स्क्रीनशॉट",
      takeFirstScreenshot: "पहला स्क्रीनशॉट लें",
      thoughts: "विचार (इन्हें जोर से पढ़ें)",
      thoughtsContent:
        "हमें दो संख्याएँ ढूंढनी हैं जो लक्ष्य मान का योग करती हैं।\nहम देखी गई संख्याओं को स्टोर करने के लिए हैश मैप का उपयोग कर सकते हैं।\nप्रत्येक संख्या के लिए, जांचें कि क्या उसका पूरक मैप में मौजूद है।",
      solution: "समाधान",
      complexity: "जटिलता",
      timeComplexity: "समय जटिलता: O(n)",
      spaceComplexity: "स्थान जटिलता: O(n)",
      whatIChanged: "मैंने क्या बदला (इसे जोर से पढ़ें)",
      changesContent:
        "वर्तमान समाधान नेस्टेड लूप्स का उपयोग करता है, जिसके परिणामस्वरूप O(n²) समय जटिलता होती है।\nहम पहले से देखी गई संख्याओं को स्टोर करने के लिए हैश मैप का उपयोग करके इसे अनुकूलित कर सकते हैं।\nयह समय जटिलता को O(n) तक कम करता है, O(n) स्थान ट्रेड-ऑफ के साथ।"
    },

    // FAQ Section
    faq: {
      title: "सामान्य प्रश्न",
      subtitle: "Interview Coder के बारे में आपको जानने की जरूरत है सब कुछ।",
      questions: {
        q1: {
          question: "क्या Interview Coder मुफ्त है?",
          answer:
            "नहीं, यह महीने का $60 है। बदले में, आपको नवीनतम मॉडल तक पहुंच मिलती है, जिसमें o3-mini-high शामिल है।"
        },
        q2: {
          question: "यह कैसे अदृश्य है?",
          answer:
            "हमारा सॉफ्टवेयर इंटरव्यूअर्स के लिए पूरी तरह से अदृश्य होने के लिए डिज़ाइन किया गया है।"
        },
        q3: {
          question: "क्या यह सभी कौशल स्तरों के लिए उपयुक्त है?",
          answer: "हां।"
        },
        q4: {
          question: "कौन सी प्रोग्रामिंग भाषाएँ समर्थित हैं?",
          answer:
            "पायथन, गोलांग, आर, एसक्यूएल, रूबी, जावा, जावास्क्रिप्ट, सी++, कोटलिन, और स्विफ्ट। आप अपनी पसंदीदा भाषा को ऐप में या अपनी सेटिंग्स में संपादित कर सकते हैं।"
        },
        q5: {
          question: "मुझे एक बग का अनुभव हो रहा है, मुझे क्या करना चाहिए",
          answer:
            "10 में से 9 बार, आप इस वेबसाइट से ऐप को अनइंस्टॉल और पुनः इंस्टॉल कर सकते हैं। यदि यह काम नहीं करता है, तो कृपया हमें ईमेल करें और हम 24 घंटों के भीतर आपसे संपर्क करेंगे।"
        }
      },
      helpCenterPrefix: "और अधिक प्रश्न हैं? हमारे",
      helpCenterLink: "सहायता केंद्र",
      helpCenterSuffix: "पर विस्तृत गाइड और सहायता के लिए जाएं।"
    },

    // CTA Section
    cta: {
      title: "छोटा रास्ता अपनाएं।",
      subtitle: "आज ही Interview Coder डाउनलोड करें और उपयोग करें।"
    },

    // Language Toggle
    language: {
      en: "English",
      hi: "हिंदी"
    },

    // Commands Section
    commands: {
      title: "हमारे पसंदीदा कमांड्स",
      subtitle: "ये कमांड्स स्वाभाविक और याद रखने में आसान हैं।",
      hideShow: "Interview Coder विंडो को तुरंत छिपाएं/दिखाएं।",
      captureScreenshot:
        "समस्या मोड: इंटरव्यू प्रश्न और आवश्यकताओं के स्क्रीनशॉट लें। समाधान मोड: अनुकूलन सुझाव प्राप्त करने के लिए अपने कोड के स्क्रीनशॉट लें।",
      generateSolution:
        "समस्या मोड: समस्या स्क्रीनशॉट के आधार पर विस्तृत स्पष्टीकरण के साथ प्रारंभिक समाधान उत्पन्न करें। समाधान मोड: अपने कोड स्क्रीनशॉट के आधार पर अपने मौजूदा समाधान को डीबग और अनुकूलित करें।",
      moveWindow: "माउस को छुए बिना अपनी स्क्रीन पर विंडो को स्थानांतरित करें।",
      reset: "एक नई समस्या के साथ शुरू करने के लिए सब कुछ रीसेट करें।",
      quit: "सभी कीबोर्ड कमांड्स की कार्यक्षमता को हटाने के लिए एप्लिकेशन से बाहर निकलें।"
    },

    // Footer
    footer: {
      allRightsReserved: "© 2025 Interview Coder. सर्वाधिकार सुरक्षित।",
      support: "सहायता",
      contact: "संपर्क करें",
      refundPolicy: "रिफंड नीति",
      cancellationPolicy: "रद्दीकरण नीति",
      termsOfService: "सेवा की शर्तें",
      download: "डाउनलोड",
      description:
        "Interview Coder एक अदृश्य डेस्कटॉप एप्लिकेशन है जो आपको लीटकोड इंटरव्यू पास करने में मदद करता है।",
      allSystemsOnline: "सभी सिस्टम ऑनलाइन हैं"
    },

    // Undetectability Section
    undetectability: {
      title: "यह कैसे अदृश्य है?",
      subtitle:
        "Interview Coder में दुनिया के सबसे मजबूत अदृश्यता सुविधाएँ हैं।",
      screenSharing: "स्क्रीन शेयरिंग डिटेक्शन",
      screenSharingDesc:
        "हमारा ऐप Zoom, Google Meet, Hackerrank और Coderpad जैसे प्लेटफॉर्म पर स्क्रीन शेयरिंग सॉफ्टवेयर और स्क्रीनशॉट के लिए पूरी तरह से अदृश्य है।",
      solutionReasoning: "समाधान तर्क",
      solutionReasoningDesc:
        "कोड की हर पंक्ति विस्तृत टिप्पणियों और प्राकृतिक सोच प्रक्रिया स्पष्टीकरणों के साथ आती है, जिससे आपको अपने समाधान दृष्टिकोण को विश्वसनीय रूप से व्यक्त करने में मदद मिलती है।",
      webcamMonitoring: "वेबकैम मॉनिटरिंग",
      webcamMonitoringDesc:
        "वेबकैम मॉनिटरिंग के दौरान अपनी आंखों को स्वाभाविक रूप से स्क्रीन पर केंद्रित रखते हुए, अपने कोडिंग क्षेत्र पर ऐप को स्थानांतरित करने के लिए ⌘ + एरो कीज़ का उपयोग करें।",
      activeTabDetection: "एक्टिव टैब डिटेक्शन",
      activeTabDetectionDesc:
        "कर्सर फोकस और एक्टिव टैब स्थिति बनाए रखते हुए ⌘ + B के साथ दृश्यता टॉगल करें, जिससे यह प्लेटफॉर्म मॉनिटरिंग द्वारा अपता लगाने योग्य नहीं होता।"
    },

    // Misc
    misc: {
      easyWorker: "अब हिंदी में!",
      affiliate: "सहबद्ध",
      proof: "प्रमाण",
      watchMe:
        "मुझे देखें Interview Coder का उपयोग करके Amazon से ऑफर प्राप्त करते हुए। इस पूरे वीडियो में, आप मुझे OA और अंतिम राउंड दोनों के लिए Interview Coder का उपयोग करते हुए देखेंगे।",
      skeptical: "संदेह है? यहां पूरा, अनकट तकनीकी साक्षात्कार देखें।",
      pro: "प्रो"
    },

    // Subscribe Page
    subscribe: {
      welcome: "Interview Coder में आपका स्वागत है",
      needToSubscribe:
        "Interview Coder का उपयोग जारी रखने के लिए, आपको सदस्यता लेनी होगी ($60/माह)",
      toggleVisibility: "दृश्यता टॉगल करें",
      quitApp: "ऐप से बाहर निकलें",
      subscribeButton: "सदस्यता लें",
      logOut: "लॉग आउट"
    },

    // Queue Component
    queue: {
      screenshot: "स्क्रीनशॉट",
      solve: "हल करें"
    },

    // QueueCommands Component
    queueCommands: {
      keyboardShortcuts: "कीबोर्ड शॉर्टकट",
      toggleWindow: "विंडो टॉगल करें",
      toggleWindowDesc: "इस विंडो को दिखाएं या छिपाएं।",
      takeScreenshot: "स्क्रीनशॉट लें",
      takeScreenshotDesc:
        "समस्या विवरण का स्क्रीनशॉट लें। टूल समस्या को निकालेगा और विश्लेषण करेगा। नवीनतम 5 स्क्रीनशॉट सहेजे जाते हैं।",
      solveProblem: "समस्या हल करें",
      solveProblemDesc: "वर्तमान समस्या के आधार पर समाधान उत्पन्न करें।"
    },

    // Auth Components
    auth: {
      loginToInterviewCoder: "Interview Coder में लॉग इन करें",
      createAccount: "अपना खाता बनाएं",
      orContinueWithEmail: "या ईमेल के साथ जारी रखें",
      emailAddress: "ईमेल पता",
      password: "पासवर्ड",
      signIn: "साइन इन करें",
      signingIn: "साइन इन हो रहा है...",
      createAccountBtn: "खाता बनाएं",
      creatingAccount: "खाता बनाया जा रहा है...",
      dontHaveAccount: "खाता नहीं है? साइन अप करें →",
      alreadyHaveAccount: "पहले से ही खाता है? साइन इन करें →",
      errorSigningIn: "कुछ गलत हो गया, बाद में पुनः प्रयास करें",
      errorSigningUp: "कुछ गलत हो गया, बाद में पुनः प्रयास करें",
      passwordMinLength: "पासवर्ड कम से कम 6 अक्षर का होना चाहिए"
    }
  }
}

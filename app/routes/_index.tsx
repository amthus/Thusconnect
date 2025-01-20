import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Enterprise-Grade Security`,
      description: `End-to-end encryption and advanced authentication keep your messages and data completely private.`,
      icon: <i className="las la-shield-alt"></i>,
    },
    {
      heading: `Real-Time Analytics`,
      description: `Monitor usage patterns and engagement with our intuitive analytics dashboard.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Multi-Device Sync`,
      description: `Seamlessly access your messages across all your devices with instant synchronization.`,
      icon: <i className="las la-sync"></i>,
    },
    {
      heading: `Group Messaging`,
      description: `Create and manage secure group conversations with customizable permissions and controls.`,
      icon: <i className="las la-users"></i>,
    },
    {
      heading: `Multimedia Support`,
      description: `Share images, audio, and documents securely with built-in media optimization.`,
      icon: <i className="las la-photo-video"></i>,
    },
    {
      heading: `Message Management`,
      description: `Advanced message organization with logical deletion and archiving capabilities.`,
      icon: <i className="las la-inbox"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `CTO, TechSecure Solutions`,
      content: `Thusconnect transformed how our team communicates. The security features give us peace of mind while keeping collaboration seamless.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `Head of IT, Global Finance Corp`,
      content: `The encryption and compliance features are outstanding. It's exactly what we needed for our sensitive communications.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `Emma Watson`,
      designation: `Operations Director, HealthCare Plus`,
      content: `Moving our team communications to Thusconnect was the best decision. The interface is intuitive and the security is unmatched.`,
      avatar: 'https://randomuser.me/api/portraits/women/27.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for small teams getting started with secure messaging`,
      monthly: 9,
      yearly: 89,
      features: [
        `Up to 10 users`,
        `Basic encryption`,
        `Group messaging`,
        `Mobile app access`,
      ],
    },
    {
      title: `Professional`,
      description: `Advanced features for growing organizations`,
      monthly: 29,
      yearly: 290,
      features: [
        `Unlimited users`,
        `Advanced encryption`,
        `Analytics dashboard`,
        `Priority support`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 99,
      yearly: 990,
      features: [
        `Custom deployment`,
        `Dedicated support`,
        `Advanced admin controls`,
        `SLA guarantee`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How secure is Thusconnect?`,
      answer: `Thusconnect uses enterprise-grade end-to-end encryption for all messages and data. Your communications are completely private and secure.`,
    },
    {
      question: `Can I use Thusconnect across multiple devices?`,
      answer: `Yes, Thusconnect supports seamless synchronization across all your devices, including desktop and mobile.`,
    },
    {
      question: `What types of files can I share?`,
      answer: `You can share images, audio files, documents, and more - all with the same level of encryption and security.`,
    },
    {
      question: `How does the pricing work for larger teams?`,
      answer: `Our Professional and Enterprise plans are designed to scale with your team size. Contact us for custom pricing for large organizations.`,
    },
  ]

  const steps = [
    {
      heading: `Sign Up`,
      description: `Create your secure account in minutes`,
    },
    {
      heading: `Set Up Your Team`,
      description: `Invite team members and create secure groups`,
    },
    {
      heading: `Configure Security`,
      description: `Customize your security settings and permissions`,
    },
    {
      heading: `Start Messaging`,
      description: `Begin sending encrypted messages across your organization`,
    },
  ]

  const painPoints = [
    {
      emoji: `😰`,
      title: `Worried about data breaches exposing sensitive communications`,
    },
    {
      emoji: `😤`,
      title: `Frustrated with unreliable messaging platforms`,
    },
    {
      emoji: `😓`,
      title: `Overwhelmed by complex security compliance requirements`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Secure Communication Made Simple`}
        subtitle={`Enterprise-grade encrypted messaging that keeps your conversations private and your data protected`}
        buttonText={`Start Secure Messaging`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/PgJNu7-thusconnect-l7Zu`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={10000}
            suffixText={`secure conversations daily`}
          />
        }
      />
      <LandingSocialProof title={`Trusted By Leading Organizations`} />
      <LandingPainPoints
        title={`Data breaches cost companies $4.35M on average. Don't be next.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Start Securing Your Communications in Minutes`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Enterprise Security Meets User Simplicity`}
        subtitle={`Everything you need to keep your communications private and your team productive`}
        features={features}
      />
      <LandingTestimonials
        title={`Trusted by Security-Conscious Organizations`}
        subtitle={`See how other companies are protecting their communications with Thusconnect`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Secure Communication Plans for Every Team`}
        subtitle={`Choose the perfect plan to protect your organization's communications`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Secure Messaging`}
        subtitle={`Everything you need to know about protecting your communications`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Secure Your Communications?`}
        subtitle={`Join thousands of organizations already protecting their messages with Thusconnect`}
        buttonText={`Start Your Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}

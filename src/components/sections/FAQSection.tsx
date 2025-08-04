import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Mail } from 'lucide-react';
import { Button } from '../ui/button';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does the points system work?',
      answer: 'You earn 10 points for every hour you spend reading online. These points accumulate in your account and can be used to track your progress in our reading contests. The first reader to reach 1,000 points wins our grand prize of $500!'
    },
    {
      question: 'What is the reading contest about?',
      answer: 'Our reading contest is an ongoing competition where readers compete to earn the most points through reading. The first person to reach 1,000 points wins $500 cash! Points are earned by reading books online through our platform, encouraging consistent reading habits.'
    },
    {
      question: 'Can I download books for offline reading?',
      answer: 'Yes! Most books in our library can be downloaded for offline reading. Simply click the download button on any book page. Downloaded books are available for 30 days and can be accessed through our mobile app even without an internet connection.'
    },
    {
      question: 'How much does it cost to use LibraryHub?',
      answer: 'LibraryHub offers both free and premium content. You can access many books for free, while premium titles require purchase. Individual book prices range from $9.99 to $24.99. We also offer a monthly subscription for unlimited access to our premium library.'
    },
    {
      question: 'Is my reading progress saved?',
      answer: 'Absolutely! Your reading progress, bookmarks, highlights, and points are automatically saved to your account. You can seamlessly switch between devices and continue reading exactly where you left off.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and we also offer cash on delivery for certain regions. All payments are processed securely through our encrypted payment system.'
    },
    {
      question: 'Can I share books with friends?',
      answer: 'While you cannot directly share purchased books due to copyright restrictions, you can recommend books to friends, create reading lists, and discuss books in our community forums. We also offer gift purchases for friends and family.'
    },
    {
      question: 'How do I track my reading statistics?',
      answer: 'Your reading statistics are available in your user dashboard. You can view total reading time, points earned, books completed, favorite genres, and your position on the leaderboard. We provide detailed insights to help you understand your reading habits.'
    },
    {
      question: 'What happens if I reach 1,000 points?',
      answer: 'Congratulations! Reaching 1,000 points makes you eligible for our grand prize. The first reader to achieve this milestone wins $500 cash. After that, we reset the contest and start a new competition with fresh prizes.'
    },
    {
      question: 'Can I get refunds for purchased books?',
      answer: 'Yes, we offer a 7-day refund policy for purchased books. If you\'re not satisfied with a book within 7 days of purchase and haven\'t read more than 20% of it, you can request a full refund through your account settings.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about LibraryHub, our reading contests, and how to make the most of your reading experience.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background border border-border rounded-xl shadow-soft overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-300"
              >
                <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-primary" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {openFAQ === index && (
                <div className="px-6 pb-4 border-t border-border animate-fade-in">
                  <p className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-card border border-border rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Can't find the answer you're looking for? Our support team is here to help you with any questions or concerns.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
            
            <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              <Mail className="h-4 w-4 mr-2" />
              Email Support
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Average response time: Less than 2 hours</p>
            <p>Support available: Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
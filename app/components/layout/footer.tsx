const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <nav aria-label="Site map">
          <ul className="grid grid-cols-3 gap-8">
            <li>
              <h2 className="font-bold mb-4">Saarathi</h2>
              <ul className="space-y-2">
                <li><a href="/" title="Home">Home</a></li>
                <li><a href="/about" title="About Saarathi">About Us</a></li>
                <li><a href="/mentors" title="Our Mentors">Mentors</a></li>
                <li><a href="/contact" title="Contact Saarathi">Contact</a></li>
              </ul>
            </li>
            <li>
              <h2 className="font-bold mb-4">Resources</h2>
              <ul className="space-y-2">
                <li><a href="/blog" title="Mentorship Blog">Blog</a></li>
                <li><a href="/sitemap.xml" title="Sitemap">Sitemap</a></li>
                <li><a href="/privacy-policy" title="Privacy Policy">Privacy Policy</a></li>
                <li><a href="/terms" title="Terms of Service">Terms of Service</a></li>
              </ul>
            </li>
            <li>
              <h2 className="font-bold mb-4">Connect</h2>
              <ul className="space-y-2">
                <li><a href="https://linkedin.com/company/saarathi-app" title="LinkedIn">LinkedIn</a></li>
                <li><a href="https://twitter.com/saarathi_app" title="Twitter">Twitter</a></li>
                <li><a href="https://instagram.com/saarathi_app" title="Instagram">Instagram</a></li>
                <li><a href="/newsletter" title="Newsletter">Newsletter</a></li>
              </ul>
            </li>
          </ul>
        </nav>
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2024 Saarathi. Global AI-Powered Mentorship Platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
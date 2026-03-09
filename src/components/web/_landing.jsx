import Link from "next/link";
import { useState, useEffect } from "react";

const TICKER_ITEMS = [
  "SHARE YOUR THOUGHTS WITH THE WORLD",
  "WRITE. PUBLISH. INSPIRE.",
  "JOIN THOUSANDS OF WRITERS",
  "YOUR STORY MATTERS",
  "START WRITING TODAY",
];

function Ticker() {
  const text =
    TICKER_ITEMS.join("  ·  ") + "  ·  " + TICKER_ITEMS.join("  ·  ");
  return (
    <div
      style={{
        background: "#e8e0d0",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        overflow: "hidden",
        padding: "8px 0",
      }}
    >
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: inline-block;
          white-space: nowrap;
          animation: ticker 30s linear infinite;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: #1a1a1a;
        }
      `}</style>
      <div className="ticker-inner">
        {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        background: "#f5f0e8",
        minHeight: "100vh",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        color: "#1a1a1a",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=IM+Fell+English:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .nav.scrolled {
          background: rgba(245, 240, 232, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid #1a1a1a;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(4rem, 12vw, 11rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -0.03em;
          color: #1a1a1a;
        }

        .hero-title .italic {
          font-style: italic;
          color: #8b1a1a;
        }

        .section-label {
          font-family: 'Courier New', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8b1a1a;
        }

        .divider {
          border: none;
          border-top: 1px solid #1a1a1a;
          margin: 0;
        }

        .divider-thick {
          border: none;
          border-top: 3px solid #1a1a1a;
          margin: 0;
        }

        .feature-card {
          border: 1px solid #1a1a1a;
          padding: 2rem;
          background: #f5f0e8;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 0; height: 3px;
          background: #8b1a1a;
          transition: width 0.3s ease;
        }
        .feature-card:hover::before { width: 100%; }
        .feature-card:hover { background: #ede8e0; }

        .feature-number {
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          font-weight: 900;
          color: #e8e0d0;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .btn-primary {
          background: #1a1a1a;
          color: #f5f0e8;
          border: 2px solid #1a1a1a;
          padding: 14px 40px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover {
          background: #8b1a1a;
          border-color: #8b1a1a;
        }

        .btn-secondary {
          background: transparent;
          color: #1a1a1a;
          border: 2px solid #1a1a1a;
          padding: 14px 40px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-secondary:hover {
          background: #1a1a1a;
          color: #f5f0e8;
        }

        .mock-post {
          border: 1px solid #c8c0b0;
          background: #faf7f2;
          transition: all 0.2s ease;
        }
        .mock-post:hover {
          border-color: #1a1a1a;
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 #1a1a1a;
        }

        .quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 8rem;
          line-height: 0.5;
          color: #8b1a1a;
          display: block;
          margin-bottom: 1rem;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 3.5rem;
          font-weight: 900;
          color: #8b1a1a;
          line-height: 1;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.8s ease forwards;
        }
        .fade-up-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-delay-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-up-delay-4 { animation-delay: 0.4s; opacity: 0; }

        .grain-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Nav */}
      <nav
        className={`nav ${scrolled ? "scrolled" : ""}`}
        style={{ padding: "1.5rem 2rem" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            THE{" "}
            <span style={{ color: "#8b1a1a", fontStyle: "italic" }}>BLOG</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link
              href="/blog"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#1a1a1a",
              }}
            >
              Read
            </Link>
            <a
              href="/create"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#1a1a1a",
              }}
            >
              Write
            </a>
            <a
              href="/auth/login"
              className="btn-primary"
              style={{ padding: "8px 20px" }}
            >
              Sign In
            </a>
          </div>
        </div>
      </nav>

      {/* Ticker */}
      <div style={{ paddingTop: "80px" }}>
        <Ticker />
      </div>

      {/* Hero */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "start",
            marginBottom: "1rem",
          }}
        >
          <div>
            <p
              className="section-label fade-up fade-up-delay-1"
              style={{ marginBottom: "1.5rem" }}
            >
              Est. 2024 · Open Publishing Platform
            </p>
            <h1 className="hero-title fade-up fade-up-delay-2">
              Where <span className="italic">Ideas</span>
              <br />
              Find Their
              <br />
              <span className="italic">Voice.</span>
            </h1>
          </div>
          <div
            style={{ textAlign: "right", paddingTop: "6rem" }}
            className="fade-up fade-up-delay-3"
          >
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "#555",
                maxWidth: "220px",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              "The blank page is not an enemy — it's an invitation."
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                alignItems: "flex-end",
              }}
            >
              <a href="/create" className="btn-primary">
                Start Writing
              </a>
              <a href="/blog" className="btn-secondary">
                Browse Stories
              </a>
            </div>
          </div>
        </div>

        <hr className="divider-thick" />

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderBottom: "1px solid #1a1a1a",
          }}
          className="fade-up fade-up-delay-4"
        >
          {[
            { n: "10K+", label: "Stories Published" },
            { n: "2.4K", label: "Active Writers" },
            { n: "∞", label: "Ideas Waiting" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                padding: "2rem",
                borderRight: i < 2 ? "1px solid #1a1a1a" : "none",
                textAlign: "center",
              }}
            >
              <div className="stat-number">{s.n}</div>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#666",
                  marginTop: "0.25rem",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mock posts grid */}
      <section
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <p className="section-label">Featured Stories</p>
          <Link
            href="/blog"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#8b1a1a",
              borderBottom: "1px solid #8b1a1a",
              paddingBottom: "2px",
            }}
          >
            View All →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "1px",
            background: "#1a1a1a",
            border: "1px solid #1a1a1a",
          }}
        >
          {[
            {
              title: "The Art of Saying Nothing With Infinite Words",
              author: "María Rodríguez",
              category: "ESSAY",
              big: true,
            },
            {
              title: "What Silicon Valley Got Wrong About Human Connection",
              author: "James Park",
              category: "TECH",
            },
            {
              title: "On Learning to Sit With Discomfort",
              author: "Aisha Okonkwo",
              category: "LIFE",
            },
          ].map((post, i) => (
            <div
              key={i}
              className="mock-post"
              style={{
                padding: i === 0 ? "2.5rem" : "1.5rem",
                background: "#faf7f2",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: i === 0 ? "300px" : "140px",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    color: "#8b1a1a",
                    marginBottom: "0.75rem",
                  }}
                >
                  {post.category}
                </p>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: i === 0 ? "1.6rem" : "1rem",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: "#1a1a1a",
                  }}
                >
                  {post.title}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "10px",
                  color: "#666",
                  marginTop: "1rem",
                }}
              >
                By {post.author}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          background: "#1a1a1a",
          padding: "4rem 2rem",
          color: "#f5f0e8",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            className="section-label"
            style={{ color: "#c8a882", marginBottom: "2rem" }}
          >
            Why Write Here
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              background: "#333",
            }}
          >
            {[
              {
                n: "01",
                title: "Real-Time Presence",
                desc: "See who's reading your posts as it happens. Connect with your audience in the moment.",
              },
              {
                n: "02",
                title: "Search & Discover",
                desc: "Full-text search across all stories. Find exactly what you're looking for.",
              },
              {
                n: "03",
                title: "Rich Media",
                desc: "Upload images, format beautifully. Your story deserves to look as good as it reads.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-card"
                style={{
                  background: "#1a1a1a",
                  borderColor: "#333",
                  color: "#f5f0e8",
                }}
              >
                <div className="feature-number" style={{ color: "#333" }}>
                  {f.n}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "0.9rem",
                    color: "#999",
                    lineHeight: 1.7,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / CTA */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem",
          textAlign: "center",
        }}
      >
        <span className="quote-mark">"</span>
        <blockquote
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            lineHeight: 1.4,
            color: "#1a1a1a",
            maxWidth: "800px",
            margin: "0 auto 3rem",
          }}
        >
          Every great writer was once a beginner with nothing but an empty page
          and something to say.
        </blockquote>
        <a
          href="/auth/login"
          className="btn-primary"
          style={{ fontSize: "12px", padding: "16px 48px" }}
        >
          Begin Your Story
        </a>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "3px solid #1a1a1a",
          padding: "2rem",
          background: "#ede8e0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.2rem",
              fontWeight: 900,
            }}
          >
            THE{" "}
            <span style={{ color: "#8b1a1a", fontStyle: "italic" }}>BLOG</span>
          </div>
          <p
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "10px",
              color: "#666",
              letterSpacing: "0.1em",
            }}
          >
            © 2024 · ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}

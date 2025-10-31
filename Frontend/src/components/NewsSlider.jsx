import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewsSlider.css";

function formatDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsSlider() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("/api/news")
      .then((res) => setNews(res.data || []))
      .catch((err) => console.error("Could not fetch news:", err));
  }, []);

  const feature = news[0];
  const editors = news.slice(1, 3);
  const trending = news.slice(3, 5);

  return (
    <section className="news-grid">
      <div className="news-grid__col news-grid__col--feature">
        <h2 className="news-grid__heading">
          <span className="bar" />
          Main Stories
        </h2>

        {feature && (
          <a
            className="card card--feature"
            href={feature.url || "#"}
            style={{ "--bg": `url(${feature.image})` }}
          >
            <span className="badge">UNCATEGORIZED</span>
            <h3 className="card__title">{feature.title}</h3>
            <p className="card__meta">
              {formatDate(feature.date)}{feature.author ? ` / ${feature.author}` : ""}
            </p>
          </a>
        )}
      </div>

      <div className="news-grid__col">
        <h2 className="news-grid__heading">
          <span className="bar" />
          Editor's Pick
        </h2>

        <div className="stack">
          {editors.map((item) => (
            <a
              key={item.id}
              className="card"
              href={item.url || "#"}
              style={{ "--bg": `url(${item.image})` }}
            >
              <span className="badge">UNCATEGORIZED</span>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__meta">{formatDate(item.date)}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="news-grid__col">
        <h2 className="news-grid__heading">
          <span className="bar" />
          Trending Stories
        </h2>

        <div className="stack">
          {trending.map((item) => (
            <a
              key={item.id}
              className="card"
              href={item.url || "#"}
              style={{ "--bg": `url(${item.image})` }}
            >
              <span className="badge">UNCATEGORIZED</span>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__meta">{formatDate(item.date)}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

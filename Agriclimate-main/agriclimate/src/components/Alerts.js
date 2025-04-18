import React, { useEffect, useState } from "react";
import { fetchWeatherNews } from "../api/newsData";

const NewsComponent = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const newsData = await fetchWeatherNews();
                setNews(newsData);
            } catch (err) {
                setError("Failed to fetch news");
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 font-semibold">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                🌱 Latest Agriculture & Weather News
            </h2>
            <ul className="space-y-4">
                {news.map((article, index) => (
                    <li key={index} className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-blue-700 hover:underline"
                        >
                            {article.title}
                        </a>
                        <p className="text-sm text-gray-600 mt-1">
                            Source: <span className="font-medium">{article.source}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsComponent;

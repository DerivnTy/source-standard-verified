import { Navigate, useParams } from "react-router-dom";
import { NewsArticleTemplate } from "@/components/learn/LearnArticleTemplate";
import { getNewsArticle } from "@/data/learn";

const LearnNewsArticle = () => {
  const { slug = "" } = useParams();
  const article = getNewsArticle(slug);
  if (!article) return <Navigate to="/learn/news" replace />;
  return <NewsArticleTemplate article={article} />;
};

export default LearnNewsArticle;

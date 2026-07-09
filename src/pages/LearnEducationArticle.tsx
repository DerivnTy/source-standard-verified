import { Navigate, useParams } from "react-router-dom";
import { EducationArticleTemplate } from "@/components/learn/LearnArticleTemplate";
import { getEducationArticle } from "@/data/learn";

const LearnEducationArticle = () => {
  const { slug = "" } = useParams();
  const article = getEducationArticle(slug);
  if (!article) return <Navigate to="/learn/education" replace />;
  return <EducationArticleTemplate article={article} />;
};

export default LearnEducationArticle;

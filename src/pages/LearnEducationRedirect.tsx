import { Navigate, useLocation, useParams } from "react-router-dom";
import {
  EDUCATION_ARTICLES,
  EDUCATION_TOPICS,
  EducationTopicId,
} from "@/data/learn";

/**
 * Redirects the retired /learn/education listing to the appropriate
 * guide URL. Preserves hash anchors — the four topic hashes map to their
 * new guide URL, other hashes are dropped.
 */
export const LearnEducationRedirect = () => {
  const { hash } = useLocation();
  const id = hash.replace("#", "");
  const topic = EDUCATION_TOPICS.find((t) => t.id === id);
  if (topic) {
    return <Navigate to={`/learn/${topic.id}`} replace />;
  }
  return <Navigate to="/learn" replace />;
};

/**
 * Redirects the retired per-article route /learn/education/:slug to
 * the corresponding guide anchor, e.g.
 *   /learn/education/what-does-verified-mean
 *     → /learn/verification#what-does-verified-mean
 */
export const LearnEducationArticleRedirect = () => {
  const { slug = "" } = useParams();
  const article = EDUCATION_ARTICLES.find((a) => a.slug === slug);
  if (!article) return <Navigate to="/learn" replace />;
  const topic: EducationTopicId = article.topic;
  return <Navigate to={`/learn/${topic}#${article.slug}`} replace />;
};

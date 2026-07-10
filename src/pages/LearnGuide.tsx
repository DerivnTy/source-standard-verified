import { Navigate, useParams } from "react-router-dom";
import { LearnGuideTemplate } from "@/components/learn/LearnGuideTemplate";
import { EDUCATION_TOPICS, EducationTopicId } from "@/data/learn";

const LearnGuide = () => {
  const { topicId = "" } = useParams();
  const topic = EDUCATION_TOPICS.find((t) => t.id === topicId);
  if (!topic) return <Navigate to="/learn" replace />;
  return <LearnGuideTemplate topicId={topic.id as EducationTopicId} />;
};

export default LearnGuide;

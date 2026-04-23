import { Link } from "react-router-dom";
import { Article, routeForArticle } from "@/data/resourceLibrary";

export const ArticleRow = ({ entry }: { entry: Article }) => (
  <li>
    <Link
      to={routeForArticle(entry.slug)}
      className="group grid grid-cols-12 gap-4 items-center px-5 py-4 transition-colors hover:bg-surface-muted"
    >
      <div className="col-span-12 md:col-span-4">
        <h3 className="t-body-md font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
          {entry.title}
        </h3>
      </div>
      <div className="col-span-12 md:col-span-6">
        <p className="t-body-sm text-muted-foreground leading-[1.55]">
          {entry.blurb}
        </p>
      </div>
      <div className="col-span-12 md:col-span-2 md:text-right">
        <span className="font-mono t-utility-xs text-muted-foreground">
          {entry.meta}
        </span>
      </div>
    </Link>
  </li>
);

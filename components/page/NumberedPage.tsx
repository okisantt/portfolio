import ClosingBand from "@/components/page/ClosingBand";
import NumberedSections from "@/components/page/NumberedSections";
import PageHead from "@/components/page/PageHead";
import { nextAfter, type PageContent } from "@/lib/content";

export default function NumberedPage({ page }: { page: PageContent }) {
  return (
    <main id="conteudo" className="np">
      <div className="np-frame">
        <PageHead eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
        <NumberedSections sections={page.sections} />
      </div>
      <ClosingBand statement={page.closing} next={nextAfter(page.href)} />
    </main>
  );
}

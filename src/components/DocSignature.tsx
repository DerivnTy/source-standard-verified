/**
 * DocSignature — institutional sign-off band under BoardCiteFooter.
 * Renders deterministic AUTH-ID derived from docId.
 */
const hashFromDocId = (docId: string): string => {
  // Deterministic short hash: take last numeric chunk + 2-char fingerprint
  const nums = docId.match(/\d+/g);
  const tail = nums ? nums[nums.length - 1].padStart(2, "0").slice(-2) : "00";
  let acc = 0;
  for (let i = 0; i < docId.length; i++) acc = (acc * 31 + docId.charCodeAt(i)) >>> 0;
  const alpha = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const a = alpha[acc % alpha.length];
  const b = alpha[(acc >>> 5) % alpha.length];
  const n = ((acc >>> 7) % 90) + 10;
  return `AUTH-${tail}-${a}${b}${n}`;
};

export const DocSignature = ({
  docId,
  authority = "Source Standard Editorial Board",
  verifiedOn,
}: {
  docId: string;
  authority?: string;
  verifiedOn?: string;
}) => {
  const authId = hashFromDocId(docId);
  return (
    <section className="bg-surface-muted">
      <div className="container-wide pb-8">
        <div className="border-t border-border pt-5 grid md:grid-cols-3 gap-4 text-[10.5px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
          <div>
            <span className="text-foreground/70 mr-2">Authorized by ·</span>
            <span className="text-foreground">{authority}</span>
          </div>
          <div>
            <span className="text-foreground/70 mr-2">Auth-ID ·</span>
            <span className="text-foreground tabular-nums">{authId}</span>
          </div>
          {verifiedOn && (
            <div className="md:text-right">
              <span className="text-foreground/70 mr-2">Data Verified ·</span>
              <span className="text-foreground tabular-nums">{verifiedOn}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

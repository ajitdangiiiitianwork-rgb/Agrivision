import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import FileDrop from "../components/FileDrop";
import { detectDisease } from "../utils/api";

export default function DiseaseDetect() {
const { t } = useTranslation();
const [file, setFile] = useState(null);
const [result, setResult] = useState(null);
const [busy, setBusy] = useState(false);

useEffect(() => {
if (!file) return;
setResult(null);
}, [file]);

const runDetect = async () => {
if (!file || busy) return;


setBusy(true);
setResult(null);

try {
  const res = await detectDisease(file);
  setResult(res);
} catch (e) {
  setResult({
    error: e.message || "Disease detection service is unavailable."
  });
} finally {
  setBusy(false);
}


};

return ( <div className="grid md:grid-cols-2 gap-4">
<Card title={t("nav.disease")}> <div className="space-y-4"> <FileDrop onFile={setFile} />


      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="Selected plant leaf"
          className="rounded-xl w-full object-cover max-h-80"
        />
      )}

      <button
        onClick={runDetect}
        disabled={!file || busy}
        className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white py-2 transition disabled:opacity-50"
      >
        {busy ? "Detecting…" : t("actions.detect")}
      </button>
    </div>
  </Card>

  <Card title="Result">
    {result?.error ? (
      <p className="text-red-600">{result.error}</p>
    ) : result ? (
      <pre className="text-xs overflow-auto">
        {JSON.stringify(result, null, 2)}
      </pre>
    ) : (
      <p className="text-sm text-gray-500">
        Select an image and click Detect to see the prediction.
      </p>
    )}
  </Card>
</div>


);
}

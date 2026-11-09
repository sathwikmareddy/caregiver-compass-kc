/* Generated from maintenance/approved-resources.json by publish.mjs. */
(function(root){
 if(!root||!Array.isArray(root.CAREGIVER_RESOURCES))return;
 const approved=[];
 const ids=new Set(root.CAREGIVER_RESOURCES.map(r=>r.id));
 for(const r of approved){if(!ids.has(r.id)){root.CAREGIVER_RESOURCES.push(r);ids.add(r.id);}}
})(typeof window!=='undefined'?window:null);

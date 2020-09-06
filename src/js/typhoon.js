'use strict';
const frm = document.getElementById('expressionForm');
function updateSpecText() {
  const sizeTexts = ['500km未満', '500km以上～800km未満', '800km以上'];
  const sizeIndex = frm.sizeRadio.value == '' ? -1 : parseInt(frm.sizeRadio.value);
  const sizeText = sizeIndex == -1 ? '（未選択）' : sizeTexts[sizeIndex];
  document.getElementById('sizeSpan').textContent = sizeText;

  const strengthTexts = [
    '33m/s（64ノット）未満',
    '33m/s（64ノット）以上～44m/s（85ノット）未満',
    '44m/s（85ノット）以上～54m/s（105ノット）未満',
    '54m/s（105ノット）以上',
  ];
  const strengthIndex = frm.strengthRadio.value == '' ? -1 : parseInt(frm.strengthRadio.value);
  const strengthText = strengthIndex == -1 ? '（未選択）' : strengthTexts[strengthIndex];
  document.getElementById('strengthSpan').textContent = strengthText;

  const expSizes = ['', '大型', '超大型'];
  const expStregths = ['', '強い', '非常に強い', '猛烈な'];
  let expText = expSizes[sizeIndex];
  if (sizeIndex > 0) {
    if (strengthIndex > 0) {
      // 両方
      expText += `で`;
    } else {
      // 大きさだけ
      expText += `な`;
    }
  }
  if (strengthIndex > 0) {
    expText += `${expStregths[strengthIndex]}`;
  }
  expText += '台風';
  document.getElementById('expSpan').textContent = expText;
}

updateSpecText();

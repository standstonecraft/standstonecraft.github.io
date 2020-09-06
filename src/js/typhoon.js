'use strict';
const frm = document.getElementById('expressionForm');
function updateSpecText() {
  const sizeTexts = ['500km未満', '500km以上～800km未満', '800km以上'];
  const sizeIndex = frm.sizeRadio.value;
  const sizeText = sizeIndex == '' ? '（未選択）' : sizeTexts[sizeIndex];
  document.getElementById('sizeSpan').textContent = sizeText;

  const strengthTexts = [
    '33m/s（64ノット）未満',
    '33m/s（64ノット）以上～44m/s（85ノット）未満',
    '44m/s（85ノット）以上～54m/s（105ノット）未満',
    '54m/s（105ノット）以上',
  ];
  const strengthIndex = frm.strengthRadio.value;
  const strengthText = strengthIndex == '' ? '（未選択）' : strengthTexts[strengthIndex];
  document.getElementById('strengthSpan').textContent = strengthText;
}

updateSpecText();

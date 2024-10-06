// src/utils/questionParser.js
export const questionParser = {
    parseQuestions(htmlString) {
        // 将HTML字符串转换为Document对象
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const questionGroups = doc.querySelectorAll('.ui-question-group');
        let data = [];

        questionGroups.forEach(group => {
            const questions = group.querySelectorAll('.ui-question');
            questions.forEach(question => {
                let questionData = {};

                // 提取问题编号和标题
                const questionTitleElement = question.querySelector('.ui-question-title .ui-question-content-wrapper');
                questionData.question = questionTitleElement ? questionTitleElement.textContent.trim() : '';

                // 提取选项
                const options = question.querySelectorAll('.ui-question-options li');
                let optionList = [];
                let correctAnswers = [];  // 用于存储正确答案

                options.forEach(option => {
                    const optionCode = option.getAttribute('code');
                    const optionContent = option.querySelector('.ui-question-content-wrapper').textContent.trim();
                    optionList.push({ code: optionCode, content: optionContent });

                    // 检查是否为正确答案
                    if (option.classList.contains('ui-correct-answer') || option.classList.contains('ui-option-selected')) {
                        correctAnswers.push(optionCode);
                    }
                });

                questionData.options = optionList;
                questionData.correctAnswer = correctAnswers;  // 可能包含多个答案

                // 加入问题数据
                data.push(questionData);
            });
        });

        return data;
    }
};

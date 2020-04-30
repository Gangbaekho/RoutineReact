const summaryReducer = (state = [], action) => {

    switch (action.type) {
        case 'GET_SUMMARIES':
            return action.summaries
        case 'ADD_SUMMARY':
            return [
                action.summary,
                ...state
            ]
        case 'UPDATE_SUMMARY': {

            const indexSummaryForUpdate = state.findIndex((summary) => summary.id === action.summary.id)

            const filteredState = state.filter((summary) => summary.id !== action.summary.id)

            filteredState.splice(indexSummaryForUpdate, 0, action.summary)

            return filteredState


        }

        case 'REMOVE_SUMMARY':
            return state.filter((item) => item.id !== action.id)

        case 'ADD_QUESTION': {

            const indexSummaryForAddQuestion = state.findIndex((summary) => summary.id === action.summaryId)

            const targetSummary = state.find((summary) => summary.id === action.summaryId)

            const newSummary = {
                ...targetSummary,
                questions: [
                    ...targetSummary.questions,
                    action.question
                ]
            }

            const filteredState = state.filter((summary) => summary.id !== action.summary)
            filteredState.splice(indexSummaryForAddQuestion, 1, newSummary)

            return filteredState


        }

        case 'REMOVE_QUESTION': {

            const indexSummaryForRemoveQuestion = state.findIndex((summary) => summary.id === action.summaryId)

            const targetSummary = state.find((summary) => summary.id === action.summaryId)

            const filteredQuestions = targetSummary.questions.filter((question) => question.id !== action.id)

            const newSummary = {
                ...targetSummary,
                questions: filteredQuestions
            }

            const filteredState = state.filter((summary) => summary.id !== action.summary)
            filteredState.splice(indexSummaryForRemoveQuestion, 1, newSummary)

            return filteredState



        }

        case 'UPDATE_QUESTION': {

            const summaryIndexForUpdateQuestion = state.findIndex((item) => item.id === action.summaryId)
            const QuestionIndexForUpdate = state[summaryIndexForUpdateQuestion].questions.findIdex((item) => item.id === action.id)

            state[summaryIndexForUpdateQuestion].questions[QuestionIndexForUpdate] = action.question


        }


    }
}

export default summaryReducer
export const initialData ={
    boards:[
        {
            id:"board-1",
            columnOrder: ['column-1','column-2','column-3'],
            columns:[
                {
                    id:"column-1",
                    boardId:'board-1',
                    title:"To do column",
                    cardOrder: ['card-1','card-2','card-3','card-4','card-5','card-6','card-7'],
                    cards:[
                        {
                            id:"card-1",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 1",
                            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrD_nJ6zY1dkvClXs1QwnDlIuY1GyhRfoN2g&usqp=CAU"
                        },
                        {
                            id:"card-2",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 2",
                            cover: null
                        },
                        {
                            id:"card-3",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 3",
                            cover: null
                        },
                        {
                            id:"card-4",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 4",
                            cover: null
                        },
                        {
                            id:"card-5",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 5",
                            cover: null
                        },
                        {
                            id:"card-6",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 6",
                            cover: null
                        }
                        ,{
                            id:"card-7",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 7",
                            cover: null
                        },{
                            id:"card-7",
                            boardId:'board-1',
                            columnId:"column-1",
                            title:"Title of card 7",
                            cover: null
                        }
                    ]
                },
                {
                    id:"column-2",
                    boardId:'board-1',
                    title:"IProcessing column",
                    cardOrder: ['card-4','card-5','card-6'],
                    cards:[
                        {
                            id:"card-4",
                            boardId:'board-1',
                            columnId:"column-2",
                            title:"Title of card 1",
                            cover: null
                        },
                        {
                            id:"card-4",
                            boardId:'board-1',
                            columnId:"column-2",
                            title:"Title of card 2",
                            cover: null
                        },
                        {
                            id:"card-5",
                            boardId:'board-1',
                            columnId:"column-2",
                            title:"Title of card 3",
                            cover: null
                        }
                    ]
                },
                {
                    id:"column-3",
                    boardId:'board-1',
                    title:"Done column",
                    cardOrder: ['card-6','card-7','card-8'],
                    cards:[
                        {
                            id:"card-6",
                            boardId:'board-1',
                            columnId:"column-3",
                            title:"Title of card 1",
                            cover: null
                        },
                        {
                            id:"card-7",
                            boardId:'board-1',
                            columnId:"column-3",
                            title:"Title of card 2",
                            cover: null
                        },
                        {
                            id:"card-7",
                            boardId:'board-1',
                            columnId:"column-3",
                            title:"Title of card 3",
                            cover: null
                        }
                    ]
                }
            ]
        }
    ]
}
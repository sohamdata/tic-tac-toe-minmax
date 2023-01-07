## Tic Tac Toe using the Min-Max Algorithm

live: https://tic-tac-toe-mini-max.netlify.app/

[Minimax](https://en.wikipedia.org/wiki/Minimax) is a kind of backtracking algorithm that is used in decision making and game theory to find the optimal move for a player, assuming that your opponent also plays optimally. It is widely used in two player turn-based games such as Tic-Tac-Toe, Backgammon, Mancala, Chess, etc.

In Minimax the two players are called maximizer and minimizer. The maximizer tries to get the highest score possible while the minimizer tries to do the opposite and get the lowest score possible.

Every board state has a value associated with it. In a given state if the maximizer has upper hand then, the score of the board will tend to be some positive value. If the minimizer has the upper hand in that board state then it will tend to be some negative value. The values of the board are calculated by some heuristics which are unique for every type of game.

<img src="https://user-images.githubusercontent.com/78294692/211163251-bcbd1c7b-ad8e-4002-a380-dca82fd764d7.png" width=500 />

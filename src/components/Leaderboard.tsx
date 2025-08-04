import React from 'react';
import { X, Trophy, Medal, Award, Crown, User, BookOpen, Clock } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';
import { Button } from './ui/button';

const Leaderboard = () => {
  const { showLeaderboard, setShowLeaderboard, leaderboard, user } = useLibrary();

  if (!showLeaderboard) return null;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-gray-900';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-amber-900';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const userRank = user ? leaderboard.findIndex(u => u.email === user.email) + 1 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-background border border-border rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-hidden animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-primary-glow/10">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Reading Contest Leaderboard</h2>
              <p className="text-sm text-muted-foreground">Race to 1000 points to win the grand prize!</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLeaderboard(false)}
            className="p-2 hover:bg-muted rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Prize Information */}
        <div className="p-6 bg-gradient-to-r from-library-gold/10 to-warning/10 border-b border-border">
          <div className="text-center">
            <h3 className="text-lg font-bold text-library-gold mb-2">🎉 Grand Prize: $500 Cash Prize! 🎉</h3>
            <p className="text-sm text-muted-foreground">
              First reader to reach 1000 points wins! Keep reading to climb the leaderboard.
            </p>
          </div>
        </div>

        {/* Current User Status */}
        {user && userRank > 0 && (
          <div className="p-4 bg-muted/30 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Your Position</p>
                  <p className="text-sm text-muted-foreground">Keep reading to climb higher!</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getRankBadge(userRank)}`}>
                  #{userRank}
                </div>
                <p className="text-sm text-primary font-bold mt-1">{user.points} points</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard List */}
        <div className="flex-1 overflow-y-auto max-h-96">
          <div className="p-6 space-y-3">
            {leaderboard.map((participant, index) => {
              const rank = index + 1;
              const isCurrentUser = user?.email === participant.email;
              const progressToGoal = (participant.points / 1000) * 100;

              return (
                <div
                  key={participant.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 hover:shadow-soft ${
                    isCurrentUser 
                      ? 'bg-primary/5 border-primary/20' 
                      : rank <= 3 
                        ? 'bg-gradient-card border-border' 
                        : 'bg-muted/30 border-border'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                      {rank <= 3 ? getRankIcon(rank) : <span className="font-bold">#{rank}</span>}
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${isCurrentUser ? 'text-primary' : ''}`}>
                        {participant.name}
                        {isCurrentUser && <span className="text-xs ml-2">(You)</span>}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Trophy className="h-4 w-4 text-primary" />
                        <span className="font-bold text-primary">{participant.points} pts</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary transition-all duration-500"
                          style={{ width: `${Math.min(progressToGoal, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{progressToGoal.toFixed(1)}% to goal</span>
                        <span>{1000 - participant.points} pts needed</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{participant.readingTime}h reading</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{participant.booksRead} books</span>
                      </div>
                    </div>
                  </div>

                  {/* Winner Badge */}
                  {participant.points >= 1000 && (
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold animate-glow">
                        🏆 WINNER!
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Earn 10 points for every hour of reading online
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
              <div>📚 Read More</div>
              <div>⏰ Earn Points</div>
              <div>🏆 Win Prizes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
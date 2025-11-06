import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { auth } from "@/config/firebase"
import { onAuthStateChanged } from 'firebase/auth'
import { toast } from "sonner"
import { Heart, Download, ExternalLink, Calendar, FileText, ArrowLeft } from "lucide-react"
import jsPDF from "jspdf"
import scholarshipsData from "@/data/scholarships.json"


const Favorites = () => {
  const navigate = useNavigate();
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    checkUserAndLoad();
  }, []);

  const checkUserAndLoad = () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error("Please login to view favorites");
        navigate("/auth");
        return;
      }

      setUserId(user.uid);
      loadFavorites(user.uid);
    });
  };

  const loadFavorites = (id) => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem(`favorites_${id}`);
    
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      
      // Filter scholarships from JSON file
      const favoriteScholarships = scholarshipsData.filter(s => 
        favoriteIds.includes(s.id)
      );
      
      setScholarships(favoriteScholarships);
    }
    
    setLoading(false);
  };

  const removeFavorite = (scholarshipId) => {
    if (!userId) return;

    // Update state
    setScholarships(prev => prev.filter(s => s.id !== scholarshipId));
    
    // Update localStorage
    const savedFavorites = localStorage.getItem(`favorites_${userId}`);
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites).filter(id => id !== scholarshipId);
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(favoriteIds));
    }
    
    toast.success("Removed from favorites");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg">Loading favorites...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/results")} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>

        <h1 className="mb-8 text-3xl font-bold">My Favorites</h1>

        {scholarships.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="mb-4 text-lg">No favorites yet</p>
              <Button onClick={() => navigate("/results")}>Browse Scholarships</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="mb-2">{scholarship.name}</CardTitle>
                      <CardDescription>{scholarship.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(scholarship.id)}
                      className="text-accent"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scholarship.benefits && (
                    <div>
                      <h4 className="mb-2 font-semibold text-accent">Benefits</h4>
                      <p className="text-sm">{scholarship.benefits}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    {scholarship.deadline && (
                      <Badge variant="outline" className="text-warning">
                        <Calendar className="mr-1 h-3 w-3" />
                        Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                      </Badge>
                    )}
                    
                    {scholarship.applicationurl && (
                      <Button asChild size="sm">
                        <a href={scholarship.applicationurl} target="_blank" rel="noopener noreferrer">
                          Apply Now
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

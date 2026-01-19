import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, Users, Mail, Phone, Loader2, LogOut, Trash2, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guests: number;
  special_requests: string | null;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading, signOut } = useAuth();
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/admin/login");
      } else if (!isAdmin) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
      } else {
        fetchReservations();
      }
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  const fetchReservations = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("*")
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true });

    if (error) {
      console.error("Error fetching reservations:", error);
      toast({
        title: "Error",
        description: "Failed to load reservations.",
        variant: "destructive",
      });
    } else {
      setReservations(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("reservations")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    } else {
      setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      toast({
        title: "Status Updated",
        description: `Reservation marked as ${status}.`,
      });
    }
  };

  const deleteReservation = async (id: string) => {
    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete reservation.",
        variant: "destructive",
      });
    } else {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      toast({
        title: "Deleted",
        description: "Reservation has been removed.",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <section className="pt-32 pb-8 bg-cream">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-sm tracking-[0.2em] uppercase text-gold font-medium">
                  Admin Dashboard
                </span>
                <h1 className="font-serif text-3xl md:text-4xl text-primary mt-2">
                  Reservations
                </h1>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={fetchReservations}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-6 bg-cream border-b">
          <div className="container-wide px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-soft">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-serif text-primary">{reservations.length}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-soft">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-serif text-primary">
                  {reservations.filter((r) => r.status === "pending").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-soft">
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-serif text-primary">
                  {reservations.filter((r) => r.status === "confirmed").length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-soft">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-serif text-primary">
                  {reservations.filter((r) => r.status === "completed").length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="section-padding">
          <div className="container-wide">
            {reservations.length === 0 ? (
              <div className="text-center py-16 bg-cream rounded-2xl">
                <Calendar className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="font-serif text-xl text-primary mb-2">No Reservations Yet</h3>
                <p className="text-muted-foreground">
                  Reservations will appear here when customers book.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Party Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{reservation.name}</p>
                              {reservation.special_requests && (
                                <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate">
                                  Note: {reservation.special_requests}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {reservation.email}
                              </p>
                              <p className="text-sm flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {reservation.phone}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {format(new Date(reservation.reservation_date), "MMM dd, yyyy")}
                              </p>
                              <p className="text-sm flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {reservation.reservation_time}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {reservation.guests}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Select
                                value={reservation.status}
                                onValueChange={(value) => updateStatus(reservation.id, value)}
                              >
                                <SelectTrigger className="w-[120px] h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Reservation?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete the reservation for {reservation.name}. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteReservation(reservation.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};

export default Admin;

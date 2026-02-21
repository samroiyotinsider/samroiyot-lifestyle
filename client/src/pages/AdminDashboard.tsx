import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { Plus, Home, MessageSquare, LogOut, Loader2, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { PropertyForm, type PropertyFormData } from "@/components/PropertyForm";
import type { Property } from "../../../drizzle/schema";

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();
  const [deletePropertyId, setDeletePropertyId] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      logout();
      setLocation("/");
      toast.success("Logged out successfully");
    },
  });

  const { data: properties, isLoading: propertiesLoading } = trpc.properties.list.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  const { data: inquiries, isLoading: inquiriesLoading } = trpc.inquiries.list.useQuery(
    undefined,
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  const createPropertyMutation = trpc.properties.create.useMutation({
    onSuccess: () => {
      toast.success("Property created successfully!");
      utils.properties.list.invalidate();
      setShowPropertyForm(false);
    },
    onError: (error) => {
      toast.error(`Failed to create property: ${error.message}`);
    },
  });

  const updatePropertyMutation = trpc.properties.update.useMutation({
    onSuccess: () => {
      toast.success("Property updated successfully!");
      utils.properties.list.invalidate();
      setShowPropertyForm(false);
      setEditingProperty(undefined);
    },
    onError: (error) => {
      toast.error(`Failed to update property: ${error.message}`);
    },
  });

  const deletePropertyMutation = trpc.properties.delete.useMutation({
    onSuccess: () => {
      toast.success("Property deleted successfully!");
      utils.properties.list.invalidate();
      setDeletePropertyId(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete property: ${error.message}`);
    },
  });

  const updateInquiryStatusMutation = trpc.inquiries.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Inquiry status updated!");
      utils.inquiries.list.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  const handlePropertySubmit = async (data: PropertyFormData) => {
    if (editingProperty) {
      await updatePropertyMutation.mutateAsync({
        id: editingProperty.id,
        ...data,
      });
    } else {
      await createPropertyMutation.mutateAsync(data);
    }
  };

  const handleAddProperty = () => {
    setEditingProperty(undefined);
    setShowPropertyForm(true);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const handleDeleteProperty = (id: number) => {
    setDeletePropertyId(id);
  };

  const confirmDelete = () => {
    if (deletePropertyId) {
      deletePropertyMutation.mutate({ id: deletePropertyId });
    }
  };

  const handleUpdateInquiryStatus = (id: number, status: "new" | "contacted" | "closed") => {
    updateInquiryStatusMutation.mutate({ id, status });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You need to be logged in as an administrator to access this page.
            </p>
            <Button className="w-full" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You do not have administrator privileges to access this page.
            </p>
            <Button className="w-full" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingInquiries = inquiries?.filter(i => i.status === "new") || [];
  const recentInquiries = inquiries?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user.name || user.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {propertiesLoading ? "..." : properties?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                {properties?.filter(p => p.status === "available").length || 0} available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiriesLoading ? "..." : pendingInquiries.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inquiriesLoading ? "..." : inquiries?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Properties Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Properties</CardTitle>
              <Button size="sm" onClick={handleAddProperty}>
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {propertiesLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              </div>
            ) : properties && properties.length > 0 ? (
              <div className="space-y-4">
                {properties.map((property) => {
                  const priceDisplay = property.priceEur 
                    ? `€${property.priceEur.toLocaleString()}`
                    : property.price 
                    ? `${property.price.toLocaleString()} THB`
                    : "Price not set";
                  
                  return (
                    <div
                      key={property.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {priceDisplay} • {property.propertyType} • {property.status}
                          {property.featured ? " • Featured" : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/properties/${property.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditProperty(property)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProperty(property.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No properties yet. Click "Add Property" to create your first listing.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {inquiriesLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
              </div>
            ) : recentInquiries.length > 0 ? (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="p-4 border rounded-lg space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{inquiry.name}</p>
                        <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                        {inquiry.phone && (
                          <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          inquiry.status === "new"
                            ? "bg-yellow-100 text-yellow-800"
                            : inquiry.status === "contacted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm">{inquiry.message}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{inquiry.inquiryType}</span>
                      {inquiry.propertyId && <span>• Property #{inquiry.propertyId}</span>}
                      <span>• {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex gap-2">
                      {inquiry.status === "new" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateInquiryStatus(inquiry.id, "contacted")}
                        >
                          Mark as Contacted
                        </Button>
                      )}
                      {inquiry.status === "contacted" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateInquiryStatus(inquiry.id, "closed")}
                        >
                          Mark as Closed
                        </Button>
                      )}
                      {inquiry.status === "closed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateInquiryStatus(inquiry.id, "new")}
                        >
                          Reopen
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No inquiries yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Property Form Dialog */}
      <Dialog open={showPropertyForm} onOpenChange={(open) => {
        setShowPropertyForm(open);
        if (!open) setEditingProperty(undefined);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? "Edit Property" : "Add New Property"}
            </DialogTitle>
          </DialogHeader>
          <PropertyForm
            property={editingProperty}
            onSubmit={handlePropertySubmit}
            onCancel={() => {
              setShowPropertyForm(false);
              setEditingProperty(undefined);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deletePropertyId !== null} onOpenChange={(open) => !open && setDeletePropertyId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property
              and remove it from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

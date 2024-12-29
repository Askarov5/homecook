import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdditionalServiceForm } from './AdditionalServiceForm'
import { AdditionalService, Chef } from '@/app/types'
import { serviceIcons, serviceDetails } from '@/lib/serviceDetails'
import { Pencil, Trash2 } from 'lucide-react'

interface AdditionalServicesProps {
  chef: Chef;
  onUpdateChef: (updatedChef: Chef) => void;
}

export function AdditionalServices({ chef, onUpdateChef }: AdditionalServicesProps) {
  const [editingService, setEditingService] = useState<AdditionalService | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleAddService = (newService: Omit<AdditionalService, 'id'>) => {
    const existingService = chef.additionalServices.find(service => service.type === newService.type);
    if (existingService) {
      setErrorMessage(`A service of type "${serviceDetails[newService.type].title}" already exists. You can edit the existing service if needed.`);
      return;
    }
    
    const serviceWithId = {
      ...newService,
      id: `service-${Date.now()}`, // Generate a unique ID
    };
    onUpdateChef({
      ...chef,
      additionalServices: [serviceWithId, ...chef.additionalServices],
    });
    setSuccessMessage(`${serviceDetails[newService.type].title} service has been successfully added.`);
    clearMessages();
  };

  const handleEditService = (updatedService: Omit<AdditionalService, 'id'>) => {
    onUpdateChef({
      ...chef,
      additionalServices: chef.additionalServices.map(service => 
        service.id === editingService?.id ? { ...updatedService, id: service.id } : service
      ),
    });
    setSuccessMessage(`${serviceDetails[updatedService.type].title} service has been successfully updated.`);
    setEditingService(null);
    clearMessages();
  };

  const handleDeleteService = (serviceId: string) => {
    onUpdateChef({
      ...chef,
      additionalServices: chef.additionalServices.filter(service => service.id !== serviceId),
    });
    clearMessages();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional Services</CardTitle>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" role="alert">
            <p className="font-bold">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded" role="alert">
            <p className="font-bold">Success</p>
            <p>{successMessage}</p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {chef.additionalServices.map((service) => {
            const ServiceIcon = serviceIcons[service.type];
            return (
              <Card key={service.id} className="flex flex-col">
                <CardHeader className="flex-grow">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ServiceIcon className="mr-2 h-5 w-5" />
                      <span className="truncate">{service.title}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingService(service)}
                        aria-label="Edit service"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        aria-label="Delete service"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm mb-2">{service.description}</p>
                  <ul className="text-sm list-disc list-inside mb-2">
                    {service.details.map((detail, index) => (
                      <li key={index} className="truncate">{detail}</li>
                    ))}
                  </ul>
                  <p className="text-sm"><strong>Conditions:</strong> {service.conditions}</p>
                  <p className="text-sm"><strong>Pricing:</strong> {service.pricing}</p>
                  <p className="text-sm"><strong>Availability:</strong> {service.availability}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <AdditionalServiceForm
          onSave={handleAddService}
          onCancel={() => clearMessages()}
        />
        {editingService && (
          <AdditionalServiceForm
            service={editingService}
            onSave={handleEditService}
            onCancel={() => setEditingService(null)}
            isEditing
          />
        )}
      </CardContent>
    </Card>
  );
}


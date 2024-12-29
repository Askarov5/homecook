import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdditionalService, ServiceType } from '@/app/types'
import { serviceDetails } from '@/lib/serviceDetails'

interface AdditionalServiceFormProps {
  service?: AdditionalService;
  onSave: (service: Omit<AdditionalService, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function AdditionalServiceForm({ service, onSave, onCancel, isEditing = false }: AdditionalServiceFormProps) {
  const [formData, setFormData] = useState<Omit<AdditionalService, 'id'>>({
    type: 'inHomeCooking',
    title: '',
    description: '',
    details: [],
    conditions: '',
    pricing: '',
    availability: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      // Set default values for new service
      const defaultType = 'inHomeCooking';
      setFormData({
        type: defaultType,
        title: serviceDetails[defaultType].title,
        description: serviceDetails[defaultType].description,
        details: serviceDetails[defaultType].details,
        conditions: serviceDetails[defaultType].conditions,
        pricing: serviceDetails[defaultType].pricing,
        availability: serviceDetails[defaultType].availability,
      });
    }
  }, [service]);

  const handleServiceTypeChange = (type: ServiceType) => {
    setFormData({
      type,
      title: serviceDetails[type].title,
      description: serviceDetails[type].description,
      details: serviceDetails[type].details,
      conditions: serviceDetails[type].conditions,
      pricing: serviceDetails[type].pricing,
      availability: serviceDetails[type].availability,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailsChange = (index: number, value: string) => {
    const newDetails = [...formData.details];
    newDetails[index] = value;
    setFormData(prev => ({ ...prev, details: newDetails }));
  };

  const addDetailField = () => {
    setFormData(prev => ({ ...prev, details: [...prev.details, ''] }));
  };

  const removeDetailField = (index: number) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, details: newDetails }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
      if (!isEditing) {
        handleServiceTypeChange('inHomeCooking');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 sm:space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="type">Service Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value: ServiceType) => handleServiceTypeChange(value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(serviceDetails).map((key) => (
                    <SelectItem key={key} value={key}>
                      {serviceDetails[key as ServiceType].title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Service Details</Label>
              {formData.details.map((detail, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Input
                    value={detail}
                    onChange={(e) => handleDetailsChange(index, e.target.value)}
                    placeholder={`Detail ${index + 1}`}
                    required
                  />
                  <Button type="button" variant="outline" onClick={() => removeDetailField(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addDetailField} className="mt-2">
                Add Detail
              </Button>
            </div>
            <div>
              <Label htmlFor="conditions">Conditions</Label>
              <Input
                id="conditions"
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="pricing">Pricing</Label>
              <Input
                id="pricing"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => {
            onCancel();
            if (!isEditing) {
              handleServiceTypeChange('inHomeCooking');
            }
          }}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Service')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}


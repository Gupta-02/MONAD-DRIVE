import React, { useState, useEffect } from 'react';
import { Wrench, AlertTriangle, CheckCircle, Calendar, Car, Clock } from 'lucide-react';

interface ServiceReminder {
    id: string;
    vehicleName: string;
    serviceType: string;
    dueDate: Date;
    urgency: 'low' | 'medium' | 'high';
    description: string;
    estimatedCost: string;
}

export const ServiceReminders: React.FC = () => {
    const [reminders, setReminders] = useState<ServiceReminder[]>([]);

    useEffect(() => {
        // Mock service reminders data
        const mockReminders: ServiceReminder[] = [
            {
                id: '1',
                vehicleName: 'Tesla Model 3',
                serviceType: 'Oil Change',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                urgency: 'medium',
                description: 'Regular oil change and filter replacement',
                estimatedCost: '$89'
            },
            {
                id: '2',
                vehicleName: 'Rivian R1T',
                serviceType: 'Tire Rotation',
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                urgency: 'low',
                description: 'Rotate tires for even wear and optimal performance',
                estimatedCost: '$45'
            },
            {
                id: '3',
                vehicleName: 'Tesla Model Y',
                serviceType: 'Brake Inspection',
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
                urgency: 'high',
                description: 'Check brake pads and rotors for wear',
                estimatedCost: '$120'
            },
            {
                id: '4',
                vehicleName: 'Ford F-150',
                serviceType: 'Battery Check',
                dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                urgency: 'low',
                description: 'Test battery health and connections',
                estimatedCost: '$25'
            }
        ];
        setReminders(mockReminders);
    }, []);

    const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
            case 'high': return 'text-red-600 bg-red-50 border-red-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getUrgencyIcon = (urgency: string) => {
        switch (urgency) {
            case 'high': return <AlertTriangle className="w-4 h-4" />;
            case 'medium': return <Clock className="w-4 h-4" />;
            case 'low': return <CheckCircle className="w-4 h-4" />;
            default: return <Wrench className="w-4 h-4" />;
        }
    };

    const formatDueDate = (date: Date) => {
        const now = new Date();
        const diffTime = date.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return 'Due tomorrow';
        if (diffDays < 7) return `Due in ${diffDays} days`;
        return date.toLocaleDateString();
    };

    const sortedReminders = [...reminders].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                    <Wrench className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Service Reminders</h2>
                    <p className="text-gray-600">Keep your vehicles in top condition</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedReminders.map((reminder, index) => (
                    <div
                        key={reminder.id}
                        className={`p-4 rounded-lg border ${getUrgencyColor(reminder.urgency)} relative overflow-hidden`}
                    >
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                            <Car className="w-full h-full" />
                        </div>

                        <div className="relative">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {getUrgencyIcon(reminder.urgency)}
                                    <span className="font-medium text-gray-900 capitalize">
                                        {reminder.urgency} Priority
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-gray-600">
                                    {reminder.estimatedCost}
                                </span>
                            </div>

                            <h3 className="font-semibold text-gray-900 mb-1">
                                {reminder.vehicleName}
                            </h3>

                            <p className="text-sm text-gray-700 mb-2">
                                {reminder.serviceType}
                            </p>

                            <p className="text-xs text-gray-600 mb-3">
                                {reminder.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className={`font-medium ${
                                    reminder.urgency === 'high' ? 'text-red-600' :
                                    reminder.urgency === 'medium' ? 'text-yellow-600' :
                                    'text-green-600'
                                }`}>
                                    {formatDueDate(reminder.dueDate)}
                                </span>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button className="px-3 py-1 text-xs bg-white/80 hover:bg-white text-gray-700 rounded-md transition-colors">
                                    Schedule
                                </button>
                                <button className="px-3 py-1 text-xs bg-white/80 hover:bg-white text-gray-700 rounded-md transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {reminders.length === 0 && (
                <div
                    className="text-center py-12"
                >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">All Caught Up!</h3>
                    <p className="text-gray-600">No service reminders at this time.</p>
                </div>
            )}

            {/* Summary Stats */}
            <div
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                            {reminders.filter(r => r.urgency === 'high').length}
                        </div>
                        <div className="text-sm text-gray-600">High Priority</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                            {reminders.filter(r => r.urgency === 'medium').length}
                        </div>
                        <div className="text-sm text-gray-600">Medium Priority</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {reminders.filter(r => r.urgency === 'low').length}
                        </div>
                        <div className="text-sm text-gray-600">Low Priority</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            ${reminders.reduce((sum, r) => sum + parseInt(r.estimatedCost.replace('$', '')), 0)}
                        </div>
                        <div className="text-sm text-gray-600">Est. Total Cost</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
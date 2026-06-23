import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CleaningReport } from '../models/cleaning';
import { CleaningService } from '../services/cleaning.service';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit, OnDestroy {
  @ViewChild('signatureCanvas', { static: false }) signatureCanvas!: ElementRef<HTMLCanvasElement>;

  // Authentication State
  userRole: 'admin' | 'guest' | null = null;
  passwordInput: string = '';

  // Tab State
  activeTab: 'dashboard' | 'form' | 'maintenance' = 'dashboard';

  // Subscriptions
  private cleaningsSub!: Subscription;

  // Database
  cleanings: CleaningReport[] = [];
  filteredCleanings: CleaningReport[] = [];
  maintenanceCleanings: CleaningReport[] = [];

  // Filter States
  filterAccommodation: string = 'all';
  filterSeverity: string = 'all';

  // Metrics
  totalCleanings: number = 0;
  avgTime: number = 0;
  activeAlerts: number = 0;
  efficiency: number = 100;

  // Room Status States
  roomStatuses = {
    leon: { status: 'Inactivo', date: 'Sin registros', badgeClass: 'bg-slate-200 text-slate-600', emoji: '🦁' },
    elefante: { status: 'Inactivo', date: 'Sin registros', badgeClass: 'bg-slate-200 text-slate-600', emoji: '🐘' },
    colibri: { status: 'Inactivo', date: 'Sin registros', badgeClass: 'bg-slate-200 text-slate-600', emoji: '𓅭' }
  };

  // Form Model States
  formAccommodation: string = '';
  formDate: string = '';
  formCleaner: string = '';
  formGuest: string = '';
  formTimeStart: string = '';
  formTimeEnd: string = '';
  kitchenInventoried: boolean = false;
  kitchenOk: boolean = true;
  kitchenNotes: string = '';
  incidentSeverity: 'Normal' | 'Menor' | 'Crítico' = 'Normal';
  incidentDetails: string = '';
  generalNotes: string = '';

  // Checklist items chosen (array of IDs)
  checkedCleanliness: string[] = [];
  checkedHardware: string[] = [];

  // Timer States
  timerInterval: any = null;
  timerSeconds: number = 0;
  timerIsRunning: boolean = false;
  liveTimer: string = '00:00';

  // Drawing Canvas Context
  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;

  // Modal
  modalIsOpen: boolean = false;
  selectedReport: CleaningReport | null = null;

  // Toasts
  toasts: ToastMessage[] = [];
  private toastIdCounter = 0;

  // Static Checklist Configuration
  cleanlinessItems = [
    { id: 'c1', label: 'Retirar basura', icon: 'fa-trash' },
    { id: 'c2', label: 'Barrer pisos', icon: 'fa-broom' },
    { id: 'c3', label: 'Trapear pisos', icon: 'fa-bucket' },
    { id: 'c4', label: 'Limpiar muebles y superficies', icon: 'fa-couch' },
    { id: 'c5', label: 'Limpiar ventanas y espejos', icon: 'fa-window-maximize' },
    { id: 'c6', label: 'Limpieza de baño', icon: 'fa-soap' },
    { id: 'c7', label: 'Limpiar regadera y sanitario', icon: 'fa-shower' },
    { id: 'c8', label: 'Cambiar sábanas', icon: 'fa-bed' },
    { id: 'c9', label: 'Tender camas', icon: 'fa-bed-pulse' }, // bed-pulse or bed fallback
    { id: 'c10', label: 'Colocar toallas limpias', icon: 'fa-sheet-plastic' },
    { id: 'c11', label: 'Limpiar cocineta', icon: 'fa-sink' },
    { id: 'c12', label: 'Limpiar refrigerador', icon: 'fa-kitchen-set' },
    { id: 'c13', label: 'Limpiar área exterior', icon: 'fa-tree' }
  ];

  hardwareItems = [
    { id: 'h1', label: 'Aire acondicionado', icon: 'fa-snowflake' },
    { id: 'h2', label: 'Ventilador', icon: 'fa-fan' },
    { id: 'h3', label: 'Refrigerador', icon: 'fa-cube' },
    { id: 'h4', label: 'Estufa', icon: 'fa-fire-burner' },
    { id: 'h5', label: 'Cocineta en buen estado y limpia', icon: 'fa-faucet' },
    { id: 'h6', label: 'Televisión', icon: 'fa-tv' },
    { id: 'h7', label: 'Internet', icon: 'fa-wifi' },
    { id: 'h8', label: 'Todas las luces', icon: 'fa-lightbulb' },
    { id: 'h9', label: 'Contactos eléctricos', icon: 'fa-plug' },
    { id: 'h10', label: 'Agua caliente', icon: 'fa-temperature-high' },
    { id: 'h11', label: 'Llaves y regadera sin fugas', icon: 'fa-droplet' },
    { id: 'h12', label: 'Puertas y cerraduras', icon: 'fa-key' }
  ];

  constructor(private cleaningService: CleaningService) {}

  ngOnInit() {
    // Dynamically inject Tailwind and FontAwesome for isolation
    this.injectCDNs();

    this.setFormDefaultDate();

    // Check existing session
    const savedRole = sessionStorage.getItem('seguimientoRole');
    if (savedRole === 'admin' || savedRole === 'guest') {
      this.userRole = savedRole as 'admin' | 'guest';
      this.activeTab = this.userRole === 'admin' ? 'dashboard' : 'form';
    }

    // Subscribe to Firestore cleanings database
    this.cleaningsSub = this.cleaningService.getCleanings().subscribe(reports => {
      this.cleanings = reports;
      this.applyFilters();
      this.applyMaintenanceFilters();
      this.updateDashboardMetrics();
      this.updateRoomStatuses();
    });

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  // Login / Authentication Methods
  loginAsAdmin() {
    if (this.passwordInput === 'admin12345') {
      this.userRole = 'admin';
      this.activeTab = 'dashboard';
      sessionStorage.setItem('seguimientoRole', 'admin');
      this.showToast('Acceso como Administrador concedido', 'success');
      this.passwordInput = '';
    } else {
      this.showToast('Contraseña incorrecta', 'error');
    }
  }

  loginAsGuest() {
    this.userRole = 'guest';
    this.activeTab = 'form';
    sessionStorage.setItem('seguimientoRole', 'guest');
    this.showToast('Acceso como Operador/Invitado concedido', 'success');
    setTimeout(() => {
      this.initSignatureCanvas();
    }, 150);
  }

  logout() {
    this.userRole = null;
    this.passwordInput = '';
    sessionStorage.removeItem('seguimientoRole');
    this.resetForm();
    this.showToast('Sesión cerrada correctamente', 'info');
  }

  ngOnDestroy() {
    this.removeCDNs();
    if (this.cleaningsSub) {
      this.cleaningsSub.unsubscribe();
    }
    this.stopTimerLogic();
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  private injectCDNs() {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      script.id = 'tailwind-cdn';
      document.head.appendChild(script);
    }

    if (!document.getElementById('font-awesome-cdn')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      link.id = 'font-awesome-cdn';
      document.head.appendChild(link);
    }
  }

  private removeCDNs() {
    const script = document.getElementById('tailwind-cdn');
    if (script) script.remove();

    const link = document.getElementById('font-awesome-cdn');
    if (link) link.remove();
  }

  // Switch tabs
  switchTab(tabName: 'dashboard' | 'form' | 'maintenance') {
    this.activeTab = tabName;
    if (tabName === 'form') {
      setTimeout(() => {
        this.initSignatureCanvas();
      }, 150);
    }
  }

  // Set today's date in local YYYY-MM-DD
  setFormDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.formDate = `${year}-${month}-${day}`;
  }

  // Calculate dashboard metrics
  updateDashboardMetrics() {
    this.totalCleanings = this.cleanings.length;
    
    // Avg time
    if (this.totalCleanings > 0) {
      const sum = this.cleanings.reduce((acc, curr) => acc + (curr.duration || 0), 0);
      this.avgTime = Math.round(sum / this.totalCleanings);
    } else {
      this.avgTime = 0;
    }

    // Active alerts
    this.activeAlerts = this.cleanings.filter(c => c.incidentSeverity !== 'Normal').length;

    // Efficiency
    if (this.totalCleanings > 0) {
      let totalCompleted = 0;
      let totalTasksPossible = 0;
      this.cleanings.forEach(c => {
        totalCompleted += (c.cleanliness?.length || 0) + (c.hardware?.length || 0);
        totalTasksPossible += this.cleanlinessItems.length + this.hardwareItems.length;
      });
      this.efficiency = Math.round((totalCompleted / totalTasksPossible) * 100);
    } else {
      this.efficiency = 100;
    }
  }

  // Update room status cards (showing status of the most recent report)
  updateRoomStatuses() {
    const rooms = [
      { key: 'leon', name: 'Bungalow León', emoji: '🦁' },
      { key: 'elefante', name: 'Bungalow Elefante', emoji: '🐘' },
      { key: 'colibri', name: 'Glamping Colibrí', emoji: '𓅭' }
    ];

    rooms.forEach(r => {
      // Find the most recent cleaning for this room
      const roomCleanings = this.cleanings.filter(c => c.accommodation === r.name);
      if (roomCleanings.length > 0) {
        // Sort by date/times desc (already sorted by date desc from service, but let's take index 0)
        const latest = roomCleanings[0];
        
        let status = 'Limpio';
        let badgeClass = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
        if (latest.incidentSeverity === 'Crítico') {
          status = 'Bloqueado';
          badgeClass = 'bg-red-100 text-red-800 border border-red-200';
        } else if (latest.incidentSeverity === 'Menor') {
          status = 'Mantenimiento';
          badgeClass = 'bg-amber-100 text-amber-800 border border-amber-200';
        }

        // Format relative or friendly date
        const formattedDate = this.formatDateLabel(latest.date) + ` (${latest.timeEnd || latest.timeStart || ''})`;
        
        this.roomStatuses[r.key] = {
          status,
          date: formattedDate,
          badgeClass,
          emoji: r.emoji
        };
      } else {
        // Default empty state
        this.roomStatuses[r.key] = {
          status: 'Inactivo',
          date: 'Sin registros',
          badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200',
          emoji: r.emoji
        };
      }
    });
  }

  formatDateLabel(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }

  // Filtering history
  applyFilters() {
    if (this.filterAccommodation === 'all') {
      this.filteredCleanings = [...this.cleanings];
    } else {
      this.filteredCleanings = this.cleanings.filter(c => c.accommodation === this.filterAccommodation);
    }
  }

  // Filtering maintenance issues
  applyMaintenanceFilters() {
    let base = this.cleanings.filter(c => c.incidentSeverity !== 'Normal');
    if (this.filterSeverity !== 'all') {
      base = base.filter(c => c.incidentSeverity === this.filterSeverity);
    }
    this.maintenanceCleanings = base;
  }

  onFilterAccommodationChange(event: any) {
    this.filterAccommodation = event.target.value;
    this.applyFilters();
  }

  onFilterSeverityChange(event: any) {
    this.filterSeverity = event.target.value;
    this.applyMaintenanceFilters();
  }

  // Selection highlighting for accommodation buttons
  selectAccommodation(roomName: string) {
    this.formAccommodation = roomName;
  }

  // Checklist helper: toggle checklist item selection
  toggleItem(id: string, type: 'cleanliness' | 'hardware') {
    const list = type === 'cleanliness' ? this.checkedCleanliness : this.checkedHardware;
    const index = list.indexOf(id);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(id);
    }
  }

  isItemChecked(id: string, type: 'cleanliness' | 'hardware'): boolean {
    const list = type === 'cleanliness' ? this.checkedCleanliness : this.checkedHardware;
    return list.includes(id);
  }

  toggleSelectAll(type: 'cleanliness' | 'hardware') {
    const items = type === 'cleanliness' ? this.cleanlinessItems : this.hardwareItems;
    const list = type === 'cleanliness' ? this.checkedCleanliness : this.checkedHardware;
    
    if (list.length === items.length) {
      // Uncheck all
      if (type === 'cleanliness') this.checkedCleanliness = [];
      else this.checkedHardware = [];
    } else {
      // Check all
      const allIds = items.map(i => i.id);
      if (type === 'cleanliness') this.checkedCleanliness = allIds;
      else this.checkedHardware = allIds;
    }
  }

  setKitchenStatus(status: boolean) {
    this.kitchenOk = status;
  }

  updateIncidentVisuals(severity: 'Normal' | 'Menor' | 'Crítico') {
    this.incidentSeverity = severity;
  }

  // Live Timer Controller
  toggleTimer() {
    if (!this.timerIsRunning) {
      // START TIMER
      this.timerIsRunning = true;
      const now = new Date();
      // Record start time if not already set
      if (!this.formTimeStart) {
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        this.formTimeStart = `${hours}:${mins}`;
      }

      this.timerInterval = setInterval(() => {
        this.timerSeconds++;
        const minutes = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
        const seconds = String(this.timerSeconds % 60).padStart(2, '0');
        this.liveTimer = `${minutes}:${seconds}`;
      }, 1000);

      this.showToast('Cronómetro iniciado', 'info');
    } else {
      // STOP TIMER
      this.stopTimerLogic();
      const now = new Date();
      if (!this.formTimeEnd) {
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        this.formTimeEnd = `${hours}:${mins}`;
      }
      this.showToast('Cronómetro pausado', 'info');
    }
  }

  private stopTimerLogic() {
    this.timerIsRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Signature Canvas Drawing Logic
  private initSignatureCanvas() {
    if (!this.signatureCanvas) return;
    const canvas = this.signatureCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    
    // Set matching dimensions
    canvas.width = canvas.offsetWidth || 400;
    canvas.height = canvas.offsetHeight || 176;

    if (this.ctx) {
      this.ctx.strokeStyle = '#2d4542'; // text-brand-dark
      this.ctx.lineWidth = 2;
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
    }
  }

  private onWindowResize() {
    if (this.activeTab === 'form') {
      this.initSignatureCanvas();
    }
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    if (!this.ctx) return;
    this.isDrawing = true;
    const coords = this.getCoords(event);
    this.lastX = coords.x;
    this.lastY = coords.y;
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing || !this.ctx) return;
    event.preventDefault();
    const coords = this.getCoords(event);
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(coords.x, coords.y);
    this.ctx.stroke();

    this.lastX = coords.x;
    this.lastY = coords.y;
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  clearSignature() {
    if (!this.signatureCanvas || !this.ctx) return;
    const canvas = this.signatureCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private getCoords(event: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    
    if (event instanceof MouseEvent) {
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    } else {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
      };
    }
  }

  private getSignatureDataUrl(): string {
    if (!this.signatureCanvas) return '';
    return this.signatureCanvas.nativeElement.toDataURL();
  }

  // Submit report
  async submitForm(event: Event) {
    event.preventDefault();

    if (!this.formAccommodation) {
      this.showToast('Por favor, selecciona un alojamiento', 'error');
      return;
    }

    if (!this.formCleaner) {
      this.showToast('Por favor, escribe el nombre de la persona que limpia', 'error');
      return;
    }

    // Check signature canvas has drawing
    const signatureBase64 = this.getSignatureDataUrl();

    // Calculate duration in minutes
    let durationMinutes = Math.round(this.timerSeconds / 60);
    if (durationMinutes === 0 && this.formTimeStart && this.formTimeEnd) {
      const [sh, sm] = this.formTimeStart.split(':').map(Number);
      const [eh, em] = this.formTimeEnd.split(':').map(Number);
      let diff = (eh * 60 + em) - (sh * 60 + sm);
      if (diff < 0) diff += 24 * 60; // Next day fallback
      durationMinutes = diff;
    }
    if (durationMinutes === 0) {
      durationMinutes = 30; // default backup
    }

    const report: CleaningReport = {
      accommodation: this.formAccommodation,
      date: this.formDate,
      cleaner: this.formCleaner,
      guest: this.formGuest || 'N/A',
      timeStart: this.formTimeStart || '00:00',
      timeEnd: this.formTimeEnd || '00:00',
      duration: durationMinutes,
      cleanliness: [...this.checkedCleanliness],
      hardware: [...this.checkedHardware],
      kitchenInventoried: this.kitchenInventoried,
      kitchenOk: this.kitchenOk,
      kitchenNotes: this.kitchenNotes || '',
      incidentSeverity: this.incidentSeverity,
      incidentDetails: this.incidentDetails || '',
      generalNotes: this.generalNotes || '',
      signature: signatureBase64
    };

    try {
      await this.cleaningService.addCleaning(report);
      this.showToast('¡Reporte guardado con éxito!', 'success');
      this.resetForm();
      if (this.userRole === 'admin') {
        this.switchTab('dashboard');
      } else {
        setTimeout(() => {
          this.initSignatureCanvas();
        }, 150);
      }
    } catch (err) {
      console.error(err);
      this.showToast('Error al guardar en Firebase', 'error');
    }
  }

  resetForm() {
    this.formAccommodation = '';
    this.setFormDefaultDate();
    this.formCleaner = '';
    this.formGuest = '';
    this.formTimeStart = '';
    this.formTimeEnd = '';
    this.checkedCleanliness = [];
    this.checkedHardware = [];
    this.kitchenInventoried = false;
    this.kitchenOk = true;
    this.kitchenNotes = '';
    this.incidentSeverity = 'Normal';
    this.incidentDetails = '';
    this.generalNotes = '';
    this.clearSignature();
    
    // Reset timer
    this.stopTimerLogic();
    this.timerSeconds = 0;
    this.liveTimer = '00:00';
  }

  // Detail Modal Actions
  openModal(report: CleaningReport) {
    this.selectedReport = report;
    this.modalIsOpen = true;
  }

  closeModal() {
    this.selectedReport = null;
    this.modalIsOpen = false;
  }

  getCleanlinessItemLabel(id: string): string {
    return this.cleanlinessItems.find(i => i.id === id)?.label || id;
  }

  getHardwareItemLabel(id: string): string {
    return this.hardwareItems.find(i => i.id === id)?.label || id;
  }

  printReport() {
    window.print();
  }

  async deleteReport(id: string, event: Event) {
    event.stopPropagation(); // prevent modal opening
    if (confirm('¿Estás seguro de eliminar este reporte de forma permanente?')) {
      try {
        await this.cleaningService.removeCleaning(id);
        this.showToast('Reporte eliminado con éxito', 'success');
      } catch (err) {
        console.error(err);
        this.showToast('Error al eliminar de Firebase', 'error');
      }
    }
  }

  // Toast System
  showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const id = this.toastIdCounter++;
    this.toasts.push({ id, message, type });
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }, 3500);
  }

  dismissToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}

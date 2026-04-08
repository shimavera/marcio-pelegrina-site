import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Image as ImageIcon, Zap, TrendingUp, Monitor, Smartphone, Tablet, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AnalyticsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Image Analytics State
  const [formatDistribution, setFormatDistribution] = useState<any[]>([]);
  const [deviceDistribution, setDeviceDistribution] = useState<any[]>([]);
  const [bandwidthSavings, setBandwidthSavings] = useState<any[]>([]);
  const [loadTimesByDevice, setLoadTimesByDevice] = useState<any[]>([]);

  // Web Vitals State
  const [lcpByDevice, setLcpByDevice] = useState<any[]>([]);
  const [inpByDevice, setInpByDevice] = useState<any[]>([]);
  const [clsByDevice, setClsByDevice] = useState<any[]>([]);
  const [vitalsDistribution, setVitalsDistribution] = useState<any[]>([]);

  // Summary Stats
  const [totalImagesLoaded, setTotalImagesLoaded] = useState(0);
  const [totalBandwidthSaved, setTotalBandwidthSaved] = useState(0);
  const [avgLoadTime, setAvgLoadTime] = useState(0);
  const [goodVitalsPercent, setGoodVitalsPercent] = useState(0);

  useEffect(() => {
    checkAdminAndFetchData();
  }, [timeRange]);

  const checkAdminAndFetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: roleData } = await (supabase as any)
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleData) {
        toast({
          title: 'Acesso negado',
          description: 'Você não tem permissão para acessar esta página',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      await fetchAnalytics();
    } catch (error) {
      console.error('Error checking admin:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const getDateFilter = () => {
    const now = new Date();
    const daysAgo = new Date();
    
    switch (timeRange) {
      case '24h':
        daysAgo.setHours(now.getHours() - 24);
        break;
      case '7d':
        daysAgo.setDate(now.getDate() - 7);
        break;
      case '30d':
        daysAgo.setDate(now.getDate() - 30);
        break;
      case '90d':
        daysAgo.setDate(now.getDate() - 90);
        break;
      default:
        daysAgo.setDate(now.getDate() - 7);
    }
    
    return daysAgo.toISOString();
  };

  const fetchAnalytics = async () => {
    const dateFilter = getDateFilter();

    // Fetch Image Analytics
    const { data: imageData } = await (supabase as any)
      .from('image_analytics')
      .select('*')
      .gte('created_at', dateFilter);

    if (imageData && imageData.length > 0) {
      // Format Distribution
      const formats = imageData.reduce((acc: any, row: any) => {
        acc[row.format] = (acc[row.format] || 0) + 1;
        return acc;
      }, {});
      setFormatDistribution(
        Object.entries(formats).map(([name, value]) => ({ name, value }))
      );

      // Device Distribution
      const devices = imageData.reduce((acc: any, row: any) => {
        acc[row.device_type] = (acc[row.device_type] || 0) + 1;
        return acc;
      }, {});
      setDeviceDistribution(
        Object.entries(devices).map(([name, value]) => ({ name, value }))
      );

      // Bandwidth Savings Over Time
      const savingsByDate = imageData.reduce((acc: any, row: any) => {
        const date = new Date(row.created_at).toLocaleDateString('pt-BR');
        if (!acc[date]) {
          acc[date] = { date, savings: 0, count: 0 };
        }
        acc[date].savings += row.bandwidth_saved_bytes || 0;
        acc[date].count += 1;
        return acc;
      }, {});
      setBandwidthSavings(Object.values(savingsByDate));

      // Load Times by Device
      const loadTimes = imageData.reduce((acc: any, row: any) => {
        if (!acc[row.device_type]) {
          acc[row.device_type] = { device: row.device_type, total: 0, count: 0 };
        }
        acc[row.device_type].total += row.load_time_ms || 0;
        acc[row.device_type].count += 1;
        return acc;
      }, {});
      setLoadTimesByDevice(
        Object.values(loadTimes).map((d: any) => ({
          device: d.device,
          avgLoadTime: Math.round(d.total / d.count),
        }))
      );

      // Summary Stats
      setTotalImagesLoaded(imageData.length);
      setTotalBandwidthSaved(
        imageData.reduce((sum: number, row: any) => sum + (row.bandwidth_saved_bytes || 0), 0)
      );
      setAvgLoadTime(
        Math.round(
          imageData.reduce((sum: number, row: any) => sum + (row.load_time_ms || 0), 0) / imageData.length
        )
      );
    }

    // Fetch Web Vitals Analytics
    const { data: vitalsData } = await (supabase as any)
      .from('web_vitals_analytics')
      .select('*')
      .gte('created_at', dateFilter);

    if (vitalsData && vitalsData.length > 0) {
      // LCP by Device
      const lcpData = vitalsData
        .filter((row: any) => row.metric_name === 'LCP')
        .reduce((acc: any, row: any) => {
          if (!acc[row.device_type]) {
            acc[row.device_type] = { device: row.device_type, total: 0, count: 0 };
          }
          acc[row.device_type].total += parseFloat(row.metric_value);
          acc[row.device_type].count += 1;
          return acc;
        }, {});
      setLcpByDevice(
        Object.values(lcpData).map((d: any) => ({
          device: d.device,
          value: Math.round(d.total / d.count),
        }))
      );

      // INP by Device
      const inpData = vitalsData
        .filter((row: any) => row.metric_name === 'INP')
        .reduce((acc: any, row: any) => {
          if (!acc[row.device_type]) {
            acc[row.device_type] = { device: row.device_type, total: 0, count: 0 };
          }
          acc[row.device_type].total += parseFloat(row.metric_value);
          acc[row.device_type].count += 1;
          return acc;
        }, {});
      setInpByDevice(
        Object.values(inpData).map((d: any) => ({
          device: d.device,
          value: Math.round(d.total / d.count),
        }))
      );

      // CLS by Device
      const clsData = vitalsData
        .filter((row: any) => row.metric_name === 'CLS')
        .reduce((acc: any, row: any) => {
          if (!acc[row.device_type]) {
            acc[row.device_type] = { device: row.device_type, total: 0, count: 0 };
          }
          acc[row.device_type].total += parseFloat(row.metric_value);
          acc[row.device_type].count += 1;
          return acc;
        }, {});
      setClsByDevice(
        Object.values(clsData).map((d: any) => ({
          device: d.device,
          value: (d.total / d.count).toFixed(3),
        }))
      );

      // Vitals Distribution (Good/Needs Improvement/Poor)
      const ratings = vitalsData.reduce((acc: any, row: any) => {
        acc[row.metric_rating] = (acc[row.metric_rating] || 0) + 1;
        return acc;
      }, {});
      setVitalsDistribution(
        Object.entries(ratings).map(([name, value]) => ({ name, value }))
      );

      // Good Vitals Percent
      const goodCount = vitalsData.filter((row: any) => row.metric_rating === 'good').length;
      setGoodVitalsPercent(Math.round((goodCount / vitalsData.length) * 100));
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const COLORS = ['#154294', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Carregando dashboard...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-kiona mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitore performance de imagens e Core Web Vitals em tempo real
              </p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Últimas 24 horas</SelectItem>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Imagens Carregadas</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalImagesLoaded.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Total de imagens otimizadas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bandwidth Economizado</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatBytes(totalBandwidthSaved)}</div>
                <p className="text-xs text-muted-foreground">
                  ~{Math.round((totalBandwidthSaved / (totalBandwidthSaved / 0.7)) * 100)}% de economia
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio de Carga</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgLoadTime}ms</div>
                <p className="text-xs text-muted-foreground">
                  Média de todas as imagens
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Core Web Vitals</CardTitle>
                <Monitor className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{goodVitalsPercent}%</div>
                <p className="text-xs text-muted-foreground">
                  Métricas com score "good"
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="images" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="images">Performance de Imagens</TabsTrigger>
              <TabsTrigger value="vitals">Core Web Vitals</TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Format Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Formatos</CardTitle>
                    <CardDescription>Formatos de imagem mais usados</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={formatDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name.toUpperCase()}: ${entry.value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {formatDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Device Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição por Dispositivo</CardTitle>
                    <CardDescription>Carregamentos por tipo de dispositivo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={deviceDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#154294" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Bandwidth Savings Over Time */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Bandwidth Economizado ao Longo do Tempo</CardTitle>
                    <CardDescription>Economia de dados por dia</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={bandwidthSavings}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis tickFormatter={(value) => formatBytes(value)} />
                        <Tooltip formatter={(value: any) => formatBytes(value)} />
                        <Legend />
                        <Line type="monotone" dataKey="savings" stroke="#154294" name="Bytes Economizados" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Load Times by Device */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Tempo de Carregamento por Dispositivo</CardTitle>
                    <CardDescription>Tempo médio em milissegundos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={loadTimesByDevice}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="device" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="avgLoadTime" fill="#3b82f6" name="Tempo Médio (ms)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Vitals Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição de Scores</CardTitle>
                    <CardDescription>Good / Needs Improvement / Poor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={vitalsDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {vitalsDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* LCP by Device */}
                <Card>
                  <CardHeader>
                    <CardTitle>LCP por Dispositivo</CardTitle>
                    <CardDescription>Largest Contentful Paint (ms)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={lcpByDevice}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="device" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#154294" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* INP by Device */}
                <Card>
                  <CardHeader>
                    <CardTitle>INP por Dispositivo</CardTitle>
                    <CardDescription>Interaction to Next Paint (ms)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={inpByDevice}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="device" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* CLS by Device */}
                <Card>
                  <CardHeader>
                    <CardTitle>CLS por Dispositivo</CardTitle>
                    <CardDescription>Cumulative Layout Shift (score)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={clsByDevice}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="device" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#60a5fa" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyticsDashboard;

import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import gun, { MASTER_PUB_KEY } from '../../lib/gun';
import styles from './MetricsDashboard.module.css';

const MetricsDashboard = () => {
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({
        totalViews: 0,
        avgTime: 0,
        todayViews: 0,
        projectCount: 0,
        blogCount: 0
    });

    useEffect(() => {
        // Listener para Métricas
        const metricsRef = gun.get('metrics').get('daily');
        const daysData = {};

        metricsRef.map().on((val, key) => {
            if (val && key) {
                daysData[key] = val;

                const chartArray = Object.entries(daysData)
                    .map(([date, metrics]) => ({
                        date: date.split('-').slice(1).join('/'),
                        views: metrics.views || 0,
                        activeTime: Math.round((metrics.activeTime || 0) / 60),
                        fullDate: date
                    }))
                    .sort((a, b) => a.fullDate.localeCompare(b.fullDate))
                    .slice(-30);

                setData(chartArray);

                const totalV = Object.values(daysData).reduce((acc, curr) => acc + (curr.views || 0), 0);
                const totalT = Object.values(daysData).reduce((acc, curr) => acc + (curr.activeTime || 0), 0);

                const now = new Date();
                const offset = now.getTimezoneOffset();
                const localDate = new Date(now.getTime() - (offset * 60 * 1000));
                const today = localDate.toISOString().split('T')[0];
                const todayV = daysData[today]?.views || 0;

                const avgSeconds = totalV > 0 ? Math.round(totalT / totalV) : 0;
                const formatTime = (s) => {
                    const m = Math.floor(s / 60);
                    const sec = s % 60;
                    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
                };

                setStats(prev => ({
                    ...prev,
                    totalViews: totalV,
                    avgTime: formatTime(avgSeconds),
                    todayViews: todayV
                }));
            }
        });

        // Listener para Projetos
        const projectsRef = gun.user(MASTER_PUB_KEY).get('portifolio').get('projects');
        const projectsData = {};

        projectsRef.map().on((val, id) => {
            if (val) projectsData[id] = val;
            else delete projectsData[id];
            setStats(prev => ({ ...prev, projectCount: Object.keys(projectsData).length }));
        });

        // Listener para Blog
        const blogRef = gun.user(MASTER_PUB_KEY).get('portifolio').get('blog');
        const blogData = {};

        blogRef.map().on((val, id) => {
            if (val) blogData[id] = val;
            else delete blogData[id];
            setStats(prev => ({ ...prev, blogCount: Object.keys(blogData).length }));
        });

        return () => {
            metricsRef.off();
            projectsRef.off();
            blogRef.off();
        };
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Acessos Hoje</span>
                    <span className={styles.statValue}>{stats.todayViews}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Total de Acessos</span>
                    <span className={styles.statValue}>{stats.totalViews}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Projetos</span>
                    <span className={styles.statValue}>{stats.projectCount}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Posts no Blog</span>
                    <span className={styles.statValue}>{stats.blogCount}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Tempo Médio</span>
                    <span className={styles.statValue}>{stats.avgTime}</span>
                </div>
            </div>

            <div className={styles.chartContainer}>
                <h3>Acessos nos últimos 30 dias</h3>
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                                itemStyle={{ color: '#fbbf24' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="views"
                                stroke="#fbbf24"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorViews)"
                                name="Acessos"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default MetricsDashboard;
